import json,requests
import cv2
import base64
from .rabbitmq import rabbitmq_bridge
import random
import string
from bson import ObjectId
from utils.connect import LOAD_BALANCER_URL
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


def getFrame(vidcap,video_id,sec,timestamp):
    vidcap.set(cv2.CAP_PROP_POS_MSEC,sec*1000)
    hasFrames,image = vidcap.read()

    if hasFrames:
        string = base64.b64encode(cv2.imencode('.png', image)[1]).decode()
        data = {
            "video_id" : video_id,
            "timestamp": timestamp,
            "frame_sec": sec
        }
        # np.save(open("frame.npy","wb+"), image)                                           #faster method(todo)
        # print(sec)
        files = [
            ('photo', ("frame.png", string, 'application/octet')),                          #wrapping json data and image-file into a single file
            ('data', ('data', json.dumps(data), 'application/json')),
        ]

        #sending files without rabbitmq(faster)
        # r = requests.post(LOAD_BALANCER_URL, files=files)                                 #add after hosting load_balancer
        print(sec)

        #to use rabbitmq for sending(slower...bt no frames r lost)
        # rabbitmq_bridge(files,urls)
    return hasFrames

def processor(oid,file_id,timestamp):
    # sleep(5)
    if len(file_id) == 24:
        video_name = 'saves/' + randomString() + '.mp4'
        f = open(video_name, 'wb+')
        fs.download_to_stream(ObjectId(file_id), f)
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
        success = getFrame(vidcap,oid,sec,timestamp)
        while success:
            sec = sec + frameRate
            sec = round(sec, 2)
            success = getFrame(vidcap,oid,sec,timestamp)

        vidcap.release()

        '''-----------------------------------
                        end
        -----------------------------------'''

        print("Processing Done. Now Removing Video.")
        if os.path.exists(video_name):
            os.remove(video_name)

    print('Finished entire process')

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

