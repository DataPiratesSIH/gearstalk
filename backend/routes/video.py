import os
import time
import json,requests
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

# Get all Video documents
@video.route('/getvideo', methods=['GET'])
def getVideo():
    if "video" not in db.list_collection_names():
        return jsonify([]), 200
    else:
        videos = list(db.video.find({}))
        return dumps(videos), 200

# Returns videos for a search query
@video.route('/search', methods=['POST'])
def getVideoSearch():
    data = json.loads(request.data)
    search = data.get("search")
    if "video" not in db.list_collection_names() or search == None or search == "":
        return jsonify([]), 200
    else:
        videos = list(db.video.find({}))
        items = []
        for v in videos:
            if search.lower() in v['name'].lower():
                items.append(v)

        return dumps(items), 200

# Upload a video to the database
@video.route('/addvideo', methods=['POST'])
def addVideo():
    file = request.files['video']
    timestamp = request.form.get("time")
    location = request.form.get("location")
    process = request.form.get("process")
    name = file.filename
    name = os.path.splitext(name)[0]
    if process == "true":
        process = True
    else:
        process = False
    if file and allowed_file(file.filename):    
        if file.filename == None:
            filename = "Unknown_video"
        else:
            filename = secure_filename(file.filename)

    tmz_str = ' GMT+0530 (India Standard Time)'
    if timestamp.endswith(tmz_str):
        timestamp = timestamp.replace(tmz_str, '')

    try:
        date_time_obj = datetime.strptime(timestamp, '%a %b %d %Y %H:%M:%S')
    except Exception as e:
        pass
    if date_time_obj == None:
        return jsonify({
            "success": False,
            "message": "Timestamp is invalid. Please try again!"
        }), 403
        
    oid = fs.upload_from_stream(filename, file)
    f = open('saves/test.mp4','wb+')
    fs.download_to_stream(oid, f)
    f.close()
    try:
        metadata = getFirstFrame('saves/test.mp4')
        thumbnail = metadata[0]
        duration = time.strftime("%H:%M:%S", time.gmtime(metadata[1]))
    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": "Failed to process video"}), 500

    thumbnail_oid = fs.upload_from_stream(str(oid), thumbnail)
    # To check if image is saved
    # f_img = open('saves/frame2.jpg','wb+')
    # fs.download_to_stream(thumbnail_oid, f_img)
    # f_img.close()

    # insert video details
    db.video.insert_one({
        "name": name,
        "date": str(date_time_obj.date()),
        "time": str(date_time_obj.time()),
        "location_id": location,
        "file_id": str(oid),
        "thumbnail_id": str(thumbnail_oid),
        "duration": duration,
        "processed": False
    })

    return jsonify({
        "success": True, 
        "message": "Video successfully uploaded"
    }), 200

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

'''

# Delete Video by id
@video.route('/deletevideo/<oid>', methods=['DELETE'])
def deleteVideo(oid):
    if oid == None:
            return jsonify({"success": False, "message": "No Object Id in param."}), 400
    else:
        if "video" not in db.list_collection_names():
            return jsonify({"success": False, "message": "No Collection video."}), 404
        else:
            video = db.video.find_one({ "_id": ObjectId(oid)})
            try:
                fs.delete(ObjectId(video["file_id"]))
                fs.delete(ObjectId(video["thumbnail_id"]))
            except Exception as e:
                print(e)
                return jsonify({"success": False, "message": "Delete operation failed."}), 404
            result = db.video.delete_one({"_id": ObjectId(oid)})
            if (result.deleted_count) > 0:
                return jsonify({"success": True, "message": "Video successfully deleted."}), 200
            else: 
                return jsonify({"success": False, "message": "Video with provided id doesn't exist."}), 404


