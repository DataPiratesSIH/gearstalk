import os
from flask import Flask, request, jsonify, make_response, render_template, Response, Flask, flash, redirect, url_for
import json,requests
from flask_pymongo import pymongo
from gridfs import GridFS
from bson import ObjectId

app = Flask(__name__)

CONNECTION_STRING = 'mongodb://127.0.0.1:27017'
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('gearstalk')
fs = GridFS(db)

@app.route('/insert', methods=['GET'])
def insertDoc():
    db.inventory.insert_one(
    {"item": "canvas",
     "qty": 100,
     "tags": ["cotton"],
     "size": {"h": 28, "w": 35.5, "uom": "cm"}})
    return f"Done"

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['video']
    print(file)
    oid = fs.put(file)
    return f"Done"

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
    grid_out = fs.get(oid)
    contents = grid_out.read()
    return contents

@app.route('/fileview', methods=['GET'])
def fileview():
    return  f'''
            <video controls src="{url_for('file',fileid='5e997fe1a7c1ca49850bc9e7')}">
        '''

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True)