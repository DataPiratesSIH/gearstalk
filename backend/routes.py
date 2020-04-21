import os
from flask import Flask, request, jsonify, make_response, render_template, Response, Flask, flash, redirect
import json,requests
import time
import cv2
import numpy as np
import threading
from werkzeug.utils import secure_filename
from flask_pymongo import pymongo
from webapp import rabbitmq
import base64
import googlemaps


app = Flask(__name__)

GOOGLE_API_KEY = 'AIzaSyCMADuWmaxW-M9kzcQsPSouM1_sZKrE7sQ'               #google map api key

CONNECTION_STRING = 'mongodb+srv://admin:admin@cluster0-jnsfh.mongodb.net/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('gearstalk')


ALLOWED_EXTENSIONS = [ 'mp4', 'avi','jpeg','png']

'''-----------------------------------
            yolo-detection
-----------------------------------'''

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def getFrame(vidcap,sec,filename):
    vidcap.set(cv2.CAP_PROP_POS_MSEC,sec*1000)
    hasFrames,image = vidcap.read()

    if hasFrames:
        string = base64.b64encode(cv2.imencode('.png', image)[1]).decode()
        rabbitmq.rabbitmq_upload(string,filename)
        # print(result)
    return hasFrames


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
        req_data = request.get_json()
        web_url = req_data['url']
        web_addr = req_data['addr']
        gmaps = googlemaps.Client(key=GOOGLE_API_KEY)
        location = gmaps.geocode(web_addr)
        web_lat = location[0]['geometry']['location']['lat']
        web_lng = location[0]['geometry']['location']['lng']
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


def online(url):
    try:
        r = requests.head(url)
        if r.status_code == 200:
            return 1
        # prints the int of the status code. Find more at httpstatusrappers.com :)
    except requests.ConnectionError:
        return 0


@app.route('/livestream', methods=['POST'])
def livedata():
    try:
        cams = db.cams.find({})
        total_cams = db.cams.count_documents({})

        online_cams = 0
        while (total_cams != online_cams):
            online_cams = 0
            for i in cams:
                print(i['_id'])
                if online(i['url']) == 1:
                    rabbitmq.rabbitmq_live(i['_id'],i['lat'],i['lng'],i['url'])
                else:
                    online_cams+=1
            # time.sleep(0.5)                                           #to get frame in every 0.5sec

        return jsonify({"status": "Getting Live Data"}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True)