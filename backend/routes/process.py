import os
import cv2
from flask import Blueprint, request, jsonify, current_app as app
from time import sleep
import numpy as np
from bson import ObjectId
from utils.connect import db, fs
from utils.utils import getFrame, randomString
from flask_executor import Executor

process = Blueprint('process', __name__)
executor = Executor()

@process.route('/processvideo/<oid>', methods=['GET'])
def processVideo(oid):
    print(oid)
    if oid == None or len(oid) != 24:
        return jsonify({"success": False, "message": "No Object Id in param."}), 400
    elif "video" not in db.list_collection_names():
        return jsonify({"success": False, "message": "No Collection video."}), 404
    else:
        video = db.video.find_one({ "_id": ObjectId(oid)}) 
        if video['processed'] == True:
            return jsonify({"success": False, "message": "Video is already processed."}), 404
        elif video['processed'] == "processing":
            return jsonify({"success": False, "message": "Video is currently being processed."}), 404
        else:
            # @app.after_response
            def processor():
                # sleep(5)
                if len(video["file_id"]) == 24:
                    video_name = 'saves/' + randomString() + '.mp4'
                    f = open(video_name, 'wb+')
                    fs.download_to_stream(ObjectId(video["file_id"]), f)
                    f.close()

                    print("File Downloaded")

                    print("Starting processing")

                    '''-----------------------------------
                            processing goes here
                    -----------------------------------'''

                    '''send video_id = 123467 and timestamp also here!!'''
                    # path = "C:\\Users\\Lenovo\\Downloads\\Documents\\GitHub\\yolo_textiles\\Object-detection\\videos\\airport.mp4"

                    vidcap = cv2.VideoCapture(video_name)
                    sec = 0

                    frameRate = 0.5                                                         # it will capture image in each 0.5 second   
                    success = getFrame(vidcap,video_id,sec,timestamp)
                    while success:
                        sec = sec + frameRate
                        sec = round(sec, 2)
                        success = getFrame(vidcap,video_id,sec,timestamp)

                    vidcap.release()

                    '''-----------------------------------
                                    end
                    -----------------------------------'''

                    print("Processing Done. Now Removing Video.")
                    if os.path.exists(video_name):
                        os.remove(video_name)

                print('Finished entire process')
            executor.submit(processor)
            return jsonify({"status": "Video will be processed in a while!"}), 200


@process.route('/video', methods=['POST'])
def Video():
    # print('inside')
    # data = request.form
    # video = request.files['vidcap']
    # print(video)
    # image_cv = video.read()
    
    
    # np_image = np.frombuffer(image_cv, dtype=np.uint8)                                      # convert string data to numpy array
    
    # video_name = cv2.imdecode(np_image, flags=1)                                                   # convert numpy array to image
    # print(video_name)

    # def processor():

    path = "C:\\Users\\Lenovo\\Downloads\\Documents\\GitHub\\yolo_textiles\\videos\\airport.mp4"
    video_id = 123467

    vidcap = cv2.VideoCapture(path)
    sec = 0

    frameRate = 0.5                                              
    success = getFrame(vidcap,video_id,sec,timestamp)
    while success:
        sec = sec + frameRate
        sec = round(sec, 2)
        success = getFrame(vidcap,video_id,sec,timestamp)

    vidcap.release()

    '''-----------------------------------
                    end
    -----------------------------------'''

    print("Processing Done. Now Removing Video.")
    # if os.path.exists(video_name):
    #     os.remove(video_name)

    print('Finished entire process')
    # executor.submit(processor)
    return jsonify({"status": "Video will be processed in a while!"}), 200