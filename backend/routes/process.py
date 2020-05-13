import os
import cv2
from flask import Blueprint, request, jsonify, current_app as app
from time import sleep
from bson import ObjectId
from utils.connect import db, fs
from utils.utils import getFrame, randomString
from flask_executor import Executor

process = Blueprint('app', __name__)
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

                    # path = "C:\\Users\\Lenovo\\Downloads\\Documents\\GitHub\\yolo_textiles\\Object-detection\\videos\\airport.mp4"

                    vidcap = cv2.VideoCapture(video_name)
                    sec = 0

                    # it will capture image in each 0.5 second

                    # Not sure what is filename

                    # frameRate = 0.5                                              
                    # success = getFrame(vidcap,sec,filename)
                    # while success:
                    #     sec = sec + frameRate
                    #     sec = round(sec, 2)
                    #     success = getFrame(vidcap,sec,filename)

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