import pika
import json

def rabbitmq(string,filename):
    credentials = pika.PlainCredentials('test', 'test')

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='127.0.1.1', credentials=credentials))
    channel = connection.channel()

    channel.queue_declare(queue='json')

    data = {
        "file": filename,
        "img" : string
    }
    message = json.dumps(data, ensure_ascii=False, indent=4)
    
    channel.basic_publish(exchange='', routing_key='json', body=message)
    print(" [x] Sent The JSON Data")
    connection.close()