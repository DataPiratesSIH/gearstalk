import json,requests
import cv2
import base64
from .rabbitmq import rabbitmq_upload
import random
import string
from werkzeug.wsgi import ClosingIterator
from traceback import print_exc

ALLOWED_EXTENSIONS = ['mp4','avi','jpeg','png']

class AfterResponse:
    def __init__(self, application=None):
        self.function = None
        if application:
            self.init_app(application)

    def __call__(self, function):
        self.function = function

    def init_app(self, application):
        application.after_response = self
        application.wsgi_app = AfterResponseMiddleware(application.wsgi_app, self)

    def flush(self):
        if self.function is not None:
            try:
                self.function()
                self.function = None
            except Exception:
                print_exc()


class AfterResponseMiddleware:
    def __init__(self, application, after_response_ext):
        self.application = application
        self.after_response_ext = after_response_ext

    def __call__(self, environ, after_response):
        iterator = self.application(environ, after_response)
        try:
            return ClosingIterator(iterator, [self.after_response_ext.flush])
        except Exception:
            print_exc()
            return iterator

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def getFrame(vidcap,sec,filename):
    vidcap.set(cv2.CAP_PROP_POS_MSEC,sec*1000)
    hasFrames,image = vidcap.read()

    if hasFrames:
        string = base64.b64encode(cv2.imencode('.png', image)[1]).decode()
        rabbitmq_upload(string,filename)
        # print(result)
    return hasFrames

def online(url):
    try:
        r = requests.head(url)
        if r.status_code == 200:
            return 1
        # prints the int of the status code. Find more at httpstatusrappers.com :)
    except requests.ConnectionError:
        return 0

# Get first frame of video for thumbnail
def getFirstFrame(videofile):
    vidcap = cv2.VideoCapture(videofile)
    fps = vidcap.get(cv2.CAP_PROP_FPS)      
    frame_count = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count/fps
    success, image = vidcap.read()
    if success:
        dummy, thumbnail = cv2.imencode('.jpg', image)
        thumbnail = thumbnail.tostring()
    vidcap.release()
    return [thumbnail, duration]

def randomString(stringLength=8):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))    

