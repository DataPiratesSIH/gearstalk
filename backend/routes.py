import os
from flask import Flask, request, jsonify, make_response, render_template, Response
import json,requests
import time
import cv2
import numpy as np
import threading
from webapp.threading import DetectStream
import datetime

app = Flask(__name__)

video_camera = None
global_frame = None


'''-----------------------------------
            yolo-detection
-----------------------------------'''

def getFrame(vidcap,sec):
    vidcap.set(cv2.CAP_PROP_POS_MSEC,sec*1000)
    hasFrames,image = vidcap.read()
    if hasFrames:
        # result = yolo.FileUpload(image)
        # result = df2.fashion(image)
        result = DetectStream().detect(image)
        print(result)
    return hasFrames


@app.route('/upload', methods=['POST'])
def detect():
    try:
        path = request.json["pee"]
        print(path)
        vidcap = cv2.VideoCapture(path)
        sec = 0
        frameRate = 0.5                                              #it will capture image in each 0.5 second
        success = getFrame(vidcap,sec)
        while success:
            sec = sec + frameRate
            sec = round(sec, 2)
            success = getFrame(vidcap,sec)
        return jsonify({"success": path}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/livestream', methods=['GET'])
def livestream():
    try:
        webcams = ["http://192.168.0.103:8080/shot.jpg"]
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
        return jsonify({"connection status": "closed"}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True)