## gearStalk

### Metadata format
```js
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