## gearStalk

### Metadata format
```js
IP: http://159.65.144.84
Frontend: http://157.245.101.179
// For a video of 1 second
{
    "_id": "ObjectId",
    "video_id": "video_id",
    "metadata": [
        {
            "timestamp": 0, // 0 seconds
            "persons": [
                {
                    "box": [],
                    "labels": [], // Length of labels and colors should be same
                    "colors": [],
                },
                {
                    "box": [],
                    "labels": [],
                    "colors": [],
                }
            ]
        },
            {
            "timestamp": 0.5, // 0.5 seconds
            "persons": [
                {
                    "box": [],
                    "labels": [], // Length of labels and colors should be same
                    "colors": [],
                },
                {
                    "box": [],
                    "labels": [],
                    "colors": [],
                }
            ]
        },
            {
            "timestamp": 1, // 1 second
            "persons": [
                {
                    "box": [],
                    "labels": [], // Length of labels and colors should be same
                    "colors": [],
                },
                {
                    "box": [],
                    "labels": [],
                    "colors": [],
                }
            ]
        }
    ]
}
```