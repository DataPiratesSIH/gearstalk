import pika
import json

def rabbitmq_upload(string,filename):
    credentials = pika.PlainCredentials('test', 'test')

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='127.0.1.1', credentials=credentials))
    channel = connection.channel()

    channel.queue_declare(queue='uploading')

    data = {
        "file": filename,
        "img" : string
    }
    message = json.dumps(data, ensure_ascii=False, indent=4)
    
    channel.basic_publish(exchange='', routing_key='uploading', body=message)
    print(" [x] Sent The JSON Data")
    connection.close()


def rabbitmq_live(cam_id, lat, lng, url):
    credentials = pika.PlainCredentials('test', 'test')

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='127.0.1.1', credentials=credentials))
    channel = connection.channel()

    channel.queue_declare(queue='live_data')

    data = {
        "cam_id" : cam_id,
        "lat" : lat,
        "lng" : lng,
        "url" : url
    }
    message = json.dumps(data, ensure_ascii=False, indent=4)
    
    channel.basic_publish(exchange='', routing_key='live_data', body=message)
    print(" [x] Sent The JSON Data")
    connection.close()