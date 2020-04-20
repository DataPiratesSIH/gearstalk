import os
from flask import Flask, request, jsonify, make_response, render_template, Response, Flask, flash, redirect
import json,requests
import time
import cv2
import numpy as np
import threading
from werkzeug.utils import secure_filename
import datetime
from flask_pymongo import pymongo
from webapp import rabbitmq
import base64
from geopy.geocoders import Nominatim


app = Flask(__name__)

CONNECTION_STRING = 'mongodb+srv://admin:admin@cluster0-jnsfh.mongodb.net/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('gearstalk')


ALLOWED_EXTENSIONS = [ 'mp4', 'avi','jpeg']

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
            path = os.path.join(app.instance_path, 'UPLOAD_FOLDER', filename)
            file.save(path)

            # path = "C:\\Users\\Lenovo\\Downloads\\Documents\\GitHub\\yolo_textiles\\Object-detection\\videos\\airport.mp4"
            print(path)
            vidcap = cv2.VideoCapture(path)
            sec = 0
            frameRate = 0.5                                              #it will capture image in each 0.5 second
            success = getFrame(vidcap,sec,filename)
            while success:
                sec = sec + frameRate
                sec = round(sec, 2)
                success = getFrame(vidcap,sec,filename)
        return jsonify({"success": path}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/register_cam", methods=['POST'])
def register():
    try:
        geolocator = Nominatim(user_agent="gearstalk")                #google map api key
        web_url = request.data['url']
        web_addr = request.data['addr']
        location = geolocator.geocode(web_addr)
        print("qwertyu")
        web_lat = location.latitude
        web_lng = location.longitude
        print((location.latitude, location.longitude))

        record = {
                'url' : web_url,
                'lat' : web_lat,
                'lng' : web_lng,
                'addr' : web_addr
                }
        db.cams.insert(json.dumps(record))
        return jsonify({"status": "Record Sucessfully Added!!"}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


def liveframe(url):
    #status
    status = requests.get(url).status_code

    return status

# @app.route("/online_cams", methods=['GET'])
# def online():
#     try:




@app.route('/livestream', methods=['GET'])
def livestream():
    try:
        webcams = ["http://192.168.0.103:8080"]

        for i in webcams:
            rabbitmq.rabbitmq_live(i)

        present,image = DetectStream().liveframe(webcams[0])
        while present == 200:
            time.sleep(2)

            #datetime
            currentDT = datetime.datetime.now()
            frame_time = currentDT.strftime("%I:%M:%S %p")
            frame_date = currentDT.strftime("%b %d, %Y")
            frame_day = currentDT.strftime("%a")

            present,image = DetectStream().liveframe(webcams[0])
            result = DetectStream().detect(image)
            print(result,frame_time,frame_date,frame_day)

        return jsonify({"status": "Getting Live Data"}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True)