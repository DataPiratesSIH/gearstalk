import os
from flask import Flask, request, jsonify, make_response, render_template, Response, Flask, flash, redirect, url_for
from flask_cors import CORS
import json,requests
import cv2
import numpy as np
from flask_pymongo import pymongo
from gridfs import GridFSBucket
from bson import ObjectId
from dotenv import load_dotenv
import googlemaps
from datetime import datetime
from bson.json_util import dumps

load_dotenv()
GOOGLEMAPS_KEY = os.getenv("GOOGLE_MAPS_KEY")
CONNECTION_STRING = os.getenv("MONGODB_STRING")

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'saves'
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('gearstalk')
fs = GridFSBucket(db)
gmaps = googlemaps.Client(key=GOOGLEMAPS_KEY)

def address_resolver(lat, lon):
    # Reverse Geocoding with latitude and longitude
    json = gmaps.reverse_geocode((lat, lon))
    final = {}

    # Parse response into formatted location
    if json:
        data = json[0]
        for item in data['address_components']:
            for category in item['types']:
                data[category] = {}
                data[category] = item['long_name']
        final['formatted_address'] = data['formatted_address']
        final['street'] = data.get("route", None)
        final['state'] = data.get("administrative_area_level_1", None)
        final['city'] = data.get("locality", None)
        final['county'] = data.get("administrative_area_level_2", None)
        final['country'] = data.get("country", None)
        final['postal_code'] = data.get("postal_code", None)
        final['neighborhood'] = data.get("neighborhood",None)
        final['sublocality'] = data.get("sublocality", None)
        final['housenumber'] = data.get("housenumber", None)
        final['postal_town'] = data.get("postal_town", None)
        final['subpremise'] = data.get("subpremise", None)
        final['latitude'] = data.get("geometry", {}).get("location", {}).get("lat", None)
        final['longitude'] = data.get("geometry", {}).get("location", {}).get("lng", None)
        final['location_type'] = data.get("geometry", {}).get("location_type", None)
        final['postal_code_suffix'] = data.get("postal_code_suffix", None)
        final['street_number'] = data.get('street_number', None)
        # print(final)
    return final 

# Get first frame of video for thumbnail
def getFirstFrame(videofile):
    vidcap = cv2.VideoCapture(videofile)
    success, image = vidcap.read()
    if success:
        dummy, thumbnail = cv2.imencode('.jpg', image)
        thumbnail = thumbnail.tostring()
    return thumbnail

@app.route('/index', methods=['GET'])
def index():
    return '''
            <form method = "POST" action="/upload" enctype="multipart/form-data">
                <input type="file" name='video'>
                <input type="submit">
            </form>
        '''

@app.route('/file/<fileid>') 
def file(fileid):
    oid = ObjectId(fileid)
    grid_out = fs.open_download_stream(oid)
    contents = grid_out.read()
    return contents

@app.route('/fileview', methods=['GET'])
def fileview():
    return  f'''
            <video controls src="{url_for('file',fileid='5e9b2b020386b9039ddf601e')}">
        '''


'''-----------------------------------
            video-crud
-----------------------------------'''

# Upload a video to the database
@app.route('/addvideo', methods=['POST'])
def addVideo():
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
    # To check if image is saved
    # f_img = open('saves/frame2.jpg','wb+')
    # fs.download_to_stream(thumbnail_oid, f_img)
    # f_img.close()
    return jsonify({
        "success": True, 
        "message": "Video successfully uploaded",
        "video": str(oid),
        "thumbnail": str(thumbnail_oid)
    }), 200

'''
# Update Video by id
@app.route('/updatevideo', methods=['POST'])
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
@app.route('/deletevideo/<oid>', methods=['GET'])
def deleteVideo(oid):
    if oid == None:
            return jsonify({"success": False, "message": "No Object Id in param."}), 400
    else:
        if "video" not in db.list_collection_names():
            return jsonify({"success": False, "message": "No Collection video."}), 404
        else:
            return jsonify("TBD")
'''

'''-----------------------------------
            cctv-crud
-----------------------------------'''

# Get all CCTV objects
@app.route('/getcctv', methods=['GET'])
def getCCTV():
    if "cctv" not in db.list_collection_names():
        return [], 200
    else:
        cctvs = list(db.cctv.find({}))
        return dumps(cctvs), 200


# Add a CCTV camera and its location to the database
# Send JSON data from Postman
# {"lat": 23.45, "lon": 45.67}
@app.route('/addcctv', methods=['POST'])
def addCCTV():
    location = json.loads(request.data)
    print(location)
    lat = location.get("lat")
    lon = location.get("lon")
    print(lat,lon)
    if lat == None or lon == None:
        return jsonify({"success": False, "message": "Coordinate fields are empty."}), 400
    data = {}
    try:
        data = address_resolver(lat, lon)
    except Exception as e:
        print(e)
    if data == {}:
        return jsonify({"success": False, "message": "Please enter valid coordinates."}), 401
    if data['country'] == "India":
        res = db.cctv.insert_one(data)
        oid = res.inserted_id
        doc = db.cctv.find_one({ "_id": oid })
        print(doc)
        return dumps([doc]), 200
    else:
        print(data['country'])
        message = "Entered coordinates are from " + data['country'] + ". Please select coordinates from within the country."
        return jsonify({"success": False, "message": message}), 405
    
# Update CCTV by id
@app.route('/updatecctv', methods=['PATCH'])
def updateCCTV():
    location = json.loads(request.data)
    print(location)
    oid = location.get("oid")
    lat = location.get("lat")
    lon = location.get("lon")
    if lat == None or lon == None:
            return jsonify({"success": False, "message": "Coordinate fields are empty."}), 401
    try:
        data = address_resolver(lat, lon)
    except Exception as e:
        print(e)
    if data == {}:
        return jsonify({"success": False, "message": "Please enter valid coordinates."}), 400
    if data['country'] == "India":
        try:
            newvalues = { "$set": data }
            result = db.cctv.update_one({ "_id": ObjectId(oid)}, newvalues )
            if result.matched_count == 0:
                return jsonify({"success": False, "message": "ObjectId cannot be found."}), 404
            elif result.modified_count == 0:
                return jsonify({"success": False, "message": "Failed to modify document as no changes were made."}), 400
            else:
                return data, 202
        except Exception as e:
            return jsonify({"success": False, "message": "ObjectId is invalid."}), 404
    else:
        print(data['country'])
        message = "Entered coordinates are from " + data['country'] + ". Please select coordinates from within the country."
        return jsonify({"success": False, "message": message}), 406

# Delete CCTV by id
@app.route('/deletecctv/<oid>', methods=['DELETE'])
def deleteCCTV(oid):
    if oid == None:
            return jsonify({"success": False, "message": "No Object Id in param."}), 400
    else:
        if "cctv" not in db.list_collection_names():
            return jsonify({"success": False, "message": "No Collection cctv."}), 404
        else:
            result = db.cctv.delete_one({"_id": ObjectId(oid)})
            if (result.deleted_count) > 0:
                return jsonify({"success": True, "message": "CCTV successfully deleted."}), 200
            else: 
                return jsonify({"success": False, "message": "CCTV with provided id doesn't exist."}), 404

# Delete all CCTVs in the collection
@app.route('/deleteallcctv', methods=['DELETE'])
def deletAllCCTV():
    if "cctv" not in db.list_collection_names():
        return jsonify({"success": False, "message": "No Collection cctv."}), 404
    else:
        result = db.cctv.delete_many({})
        if (result.deleted_count) > 0:
            return jsonify({"success": True, "message": "All CCTVs successfully deleted."}), 200
        else: 
            return jsonify({"success": True, "message": "CCTVs collection is already empty"}), 204


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True)
