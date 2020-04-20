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


def rabbitmq_live(domain,lat,lng):
    credentials = pika.PlainCredentials('test', 'test')

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='127.0.1.1', credentials=credentials))
    channel = connection.channel()

    channel.queue_declare(queue='live_data')

    data = {
        "domain": str(domain + "/shot.jpg"),
        "lat" : lat,
        "lng" : lng
    }
    message = json.dumps(data, ensure_ascii=False, indent=4)
    
    channel.basic_publish(exchange='', routing_key='live_data', body=message)
    print(" [x] Sent The JSON Data")
    connection.close()