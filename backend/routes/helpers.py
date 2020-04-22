import os
from flask import Blueprint, request, jsonify
from utils.connect import client, db, fs
from utils.utils import allowed_file, getFrame, online
from bson import ObjectId
from datetime import datetime
from bson.json_util import dumps

helpers = Blueprint("helpers", __name__)

@helpers.route('/index', methods=['GET'])
def index():
    return '''
            <form method = "POST" action="/upload" enctype="multipart/form-data">
                <input type="file" name="video">
                <input type="submit">
            </form>
        '''

@helpers.route('/file/<fileid>') 
def file(fileid):
    oid = ObjectId(fileid)
    grid_out = fs.open_download_stream(oid)
    contents = grid_out.read()
    return contents

@helpers.route('/fileview', methods=['GET'])
def fileview():
    return  f'''
            <video controls src="{url_for('file',fileid='5e9b2b020386b9039ddf601e')}">
        '''