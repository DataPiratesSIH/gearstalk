import os
from flask import Blueprint, request, jsonify
from utils.connect import client, db, fs
from bson import ObjectId
from datetime import datetime
import nltk
from nltk.tokenize import word_tokenize
from matplotlib import colors
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')
nltk.download('wordnet')

query = Blueprint("query", __name__)
lemmatizer = WordNetLemmatizer()
stopwords = ['shirt', 'pant', 'skirt']              #add the list


'''-----------------------------------
            query functions
-----------------------------------'''

def nlp_text(text):
    tokens = word_tokenize(text)
    prev = ""
    color_values = []
    features = []
    for token in tokens:
        lemmatizer.lemmatize(token)
        if len(token) > 1 and colors.is_color_like(token):
            if colors.is_color_like(prev + token):
                color_values.append(list(colors.to_rgba(prev + token)))
            else:
                color_values.append(list(colors.to_rgba(token)))
            prev = token
        elif token in stopwords:
            features.append(token) 
    return color_values,features


'''-----------------------------------
            query-routes
-----------------------------------'''


@query.route('/textarea', methods=['POST'])
def textarea():
    data = request.get_json()
    text = data['textarea']

    #extract features from the text
    color, features = nlp_text(text)

    #query(color,features)                          #elasticsearch

    return jsonify({"color": color, "features": features}), 200
    except Exception as e:
        return f"An Error Occured: {e}"