import json,requests
import cv2

ALLOWED_EXTENSIONS = [ 'mp4', 'avi','jpeg','png']

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def getFrame(vidcap,sec,filename):
    vidcap.set(cv2.CAP_PROP_POS_MSEC,sec*1000)
    hasFrames,image = vidcap.read()

    if hasFrames:
        string = base64.b64encode(cv2.imencode('.png', image)[1]).decode()
        rabbitmq.rabbitmq_upload(string,filename)
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
    success, image = vidcap.read()
    if success:
        dummy, thumbnail = cv2.imencode('.jpg', image)
        thumbnail = thumbnail.tostring()
    return thumbnail