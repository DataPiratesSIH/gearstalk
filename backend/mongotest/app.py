import os
from flask import Flask, request, jsonify, make_response, render_template, Response, Flask, flash, redirect, url_for
from flask_cors import CORS
import json,requests
import cv2
import numpy as np
from bson import ObjectId
from datetime import datetime
from bson.json_util import dumps
from utils.geocode import address_resolver
from routes.cctv import cctv
from routes.video import video
from routes.helpers import helpers
from utils.connect import client, db, fs
from utils.cv import getFirstFrame

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

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True)
