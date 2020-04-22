import os
from dotenv import load_dotenv
from flask_pymongo import pymongo
from gridfs import GridFSBucket
import googlemaps

load_dotenv()
CONNECTION_STRING = os.getenv("MONGODB_STRING")
GOOGLEMAPS_KEY = os.getenv("GOOGLE_MAPS_KEY")

client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('gearstalk')
fs = GridFSBucket(db)
gmaps = googlemaps.Client(key=GOOGLEMAPS_KEY)