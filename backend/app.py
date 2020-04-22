import os
from flask import Flask, request, jsonify, make_response, render_template, Response, Flask, flash, redirect, url_for
from flask_cors import CORS
import json,requests
import cv2
import numpy as np
from bson import ObjectId
from datetime import datetime
from bson.json_util import dumps
from utils.geocode import address_resolver, geocode_address
from routes.cctv import cctv
from routes.video import video
from routes.helpers import helpers
from utils.connect import client, db, fs

import threading
from werkzeug.utils import secure_filename
import base64
from utils.utils import getFirstFrame, allowed_file, getFrame, online
from utils.rabbitmq import rabbitmq_live

try:
    os.mkdir('saves')
except FileExistsError as e:
    pass

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'saves'
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

app.register_blueprint(cctv, url_prefix="/cctv")
app.register_blueprint(video, url_prefix="/video")
app.register_blueprint(helpers, url_prefix="/helpers")

'''-----------------------------------
            merged-routes
-----------------------------------'''

@app.route('/')
def index():
    try:
        return '''
            <form method = "POST" action="/upload" enctype="multipart/form-data">
                <input type="file" name='video'>
                <input type="submit">
            </form>
        '''
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/upload', methods=['POST'])
def detect():
    try:
        file = request.files['video']

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # create the folders when setting up your app
            os.makedirs(os.path.join(app.instance_path, 'UPLOAD_FOLDER'), exist_ok=True)
            file_path = os.path.join(app.instance_path, 'UPLOAD_FOLDER', filename)
            print(file_path)
            file.save(file_path)

            # path = "C:\\Users\\Lenovo\\Downloads\\Documents\\GitHub\\yolo_textiles\\Object-detection\\videos\\airport.mp4"
            vidcap = cv2.VideoCapture(file_path)
            sec = 0
            frameRate = 0.5                                              #it will capture image in each 0.5 second
            success = getFrame(vidcap,sec,filename)
            while success:
                sec = sec + frameRate
                sec = round(sec, 2)
                success = getFrame(vidcap,sec,filename)
        return jsonify({"success": file_path}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/register_cam", methods=['POST'])
def register():
    try:
        req_data = json.loads(request.data)
        web_url = req_data['url']
        web_addr = req_data['addr']
        location = geocode_address(web_addr)
        web_lat = location[0]
        web_lng = location[1]
        print(web_lat,web_lng)

        record = {
                'url' : web_url,
                'lat' : web_lat,
                'lng' : web_lng,
                'addr' : web_addr
                }
        db.cams.insert_one(record)
        return jsonify({"status": "Record Sucessfully Added!!"}), 200
    except Exception as e:
        return f"An Error Occured: {e}"



@app.route('/livestream', methods=['GET'])
def livestream():
    try:
        cams = db.cams.find({})
        total_cams = db.cams.count_documents({})

        cam_list = []
        for i in cams:
            cam_list.append(str(i['url'] + "/video"))

        return jsonify({"cams" : cam_list, "total_cams" : total_cams}), 200
    except Exception as e:
        return f"An Error Occured: {e}"  

@app.route('/livestream', methods=['POST'])
def livedata():
    try:
        cams = db.cams.find({})
        total_cams = db.cams.count_documents({})

        online_cams = 0
        while (total_cams != online_cams):
            online_cams = 0
            for i in cams:
                rabbitmq_live(i['_id'],i['lat'],i['lng'],i['url'])
                # if total_cams != online_cams:
                #     print(i['_id'])
                #     rabbitmq_live(i['_id'],i['lat'],i['lng'],i['url'])
                # else:
                #     online_cams+=1
            # time.sleep(0.5)                                           #to get frame in every 0.5sec

        return jsonify({"status": "Getting Live Data"}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

'''-----------------------------------
            merged-routes
-----------------------------------'''

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True)
