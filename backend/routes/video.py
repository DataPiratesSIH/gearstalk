import os
from flask import Blueprint, request, jsonify
from utils.connect import client, db, fs
from utils.geocode import address_resolver
from bson import ObjectId
from werkzeug.utils import secure_filename
from datetime import datetime
from bson.json_util import dumps
from utils.utils import getFirstFrame, allowed_file

video = Blueprint("video", __name__)

'''-----------------------------------
            video-crud
-----------------------------------'''

# Upload a video to the database
@video.route('/addvideo', methods=['POST'])
def addVideo():
    file = request.files['video']
    time = request.form.get("time")
    location = request.form.get("location")
    process = request.form.get("process")
    if process == "true":
        process = True
    else:
        process = False
    if file and allowed_file(file.filename):    
        if file.filename == None:
            filename = "Unknown_video"
        else:
            filename = secure_filename(file.filename)

    return jsonify({
        "success": True, 
        "message": "Video successfully caught"
    }), 200
    # oid = fs.upload_from_stream(filename, file)
    # f = open('saves/test.mp4','wb+')
    # fs.download_to_stream(oid, f)
    # f.close()
    # try:
    #     thumbnail = getFirstFrame('saves/test.mp4')
    # except Exception as e:
    #     print(e)
    #     return jsonify({"success": False, "message": "Failed to process video"}), 500

    # thumbnail_oid = fs.upload_from_stream(str(oid), thumbnail)
    # # To check if image is saved
    # # f_img = open('saves/frame2.jpg','wb+')
    # # fs.download_to_stream(thumbnail_oid, f_img)
    # # f_img.close()
    # return jsonify({
    #     "success": True, 
    #     "message": "Video successfully uploaded",
    #     "video": str(oid),
    #     "thumbnail": str(thumbnail_oid)
    # }), 200

'''
# Update Video by id
@video.route('/updatevideo', methods=['POST'])
def updateVideo():
    file = request.files['video']
    if file.filename == None:
        filename = "Unknown.video"
    else:
        filename = str(file.filename)
    oid = fs.upload_from_stream(filename, file)
    f = open('saves/test.mp4','wb+')
    fs.download_to_stream(oid, f)
    f.close()
    try:
        thumbnail = getFirstFrame('saves/test.mp4')
    except Exception as e:
        return jsonify({"success": False, "message": "Failed to process video"}), 500

    thumbnail_oid = fs.upload_from_stream(str(oid), thumbnail)
    return jsonify({
        "success": True, 
        "message": "Video successfully uploaded",
        "video": str(oid),
        "thumbnail": str(thumbnail_oid)
    }), 200

# Delete Video by id
@video.route('/deletevideo/<oid>', methods=['GET'])
def deleteVideo(oid):
    if oid == None:
            return jsonify({"success": False, "message": "No Object Id in param."}), 400
    else:
        if "video" not in db.list_collection_names():
            return jsonify({"success": False, "message": "No Collection video."}), 404
        else:
            return jsonify("TBD")
'''

