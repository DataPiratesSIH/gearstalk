import mimetypes
import os
import re
from flask import Blueprint, request, jsonify, Response
from utils.connect import client, db, fs
from utils.utils import allowed_file, getFrame, online
from bson import ObjectId
from datetime import datetime
from bson.json_util import dumps

helpers = Blueprint("helpers", __name__)

@helpers.after_request
def after_request(response):
    response.headers.add('Accept-Ranges', 'bytes')
    return response

@helpers.route('/file/<fileid>') 
def file(fileid):
    oid = ObjectId(fileid)
    grid_out = fs.open_download_stream(oid)
    contents = grid_out.read()
    return contents

## Byte Streaming for Video
@helpers.route('video/<fileid>')
def video(fileid):
    oid = ObjectId(fileid)
    grid_out = fs.open_download_stream(oid)

    range_header = request.headers.get('Range', None)
    if not range_header: 
        contents = grid_out.read()
        return contents
    
    size = grid_out.length   
    byte1, byte2 = 0, None
    
    m = re.search('(\d+)-(\d*)', range_header)
    g = m.groups()
    
    if g[0]: byte1 = int(g[0])
    if g[1]: byte2 = int(g[1])

    length = size - byte1
    if byte2 is not None:
        length = byte2 + 1 - byte1
    
    data = None
    
    grid_out.seek(byte1)
    data = grid_out.read(length)
    rv = Response(data, 
        206,
        mimetype=mimetypes.guess_type(grid_out.filename)[0], 
        direct_passthrough=True)
    rv.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(byte1, byte1 + length - 1, size))
    rv.headers.add('Cache-Control', 'no-cache')
    return rv
