import os
from flask import Flask, request, jsonify, make_response, render_template, Response, Flask, flash, redirect
import json,requests
from flask_pymongo import pymongo

app = Flask(__name__)

CONNECTION_STRING = 'mongodb://127.0.0.1:27017'
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('gearstalk')

@app.route('/insert', methods=['GET'])
def insertDoc():
    db.inventory.insert_one(
    {"item": "canvas",
     "qty": 100,
     "tags": ["cotton"],
     "size": {"h": 28, "w": 35.5, "uom": "cm"}})
    return f"Done"

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True)