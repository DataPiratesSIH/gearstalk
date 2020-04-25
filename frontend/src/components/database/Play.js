import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { useParams } from 'react-router-dom';

const Play = () => {
    const params = useParams('/play/:oid');
    const { oid } = params;

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [video, setVideo] = useState()
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/video/getvideobyid/' + oid, 'GET')
                console.log(responseData)
                setVideo(responseData)
            } catch (err) {
                console.log(err)
            }
        }
        fetchVideo()
    }, [oid, sendRequest])

    return (
        <div>
            {video && (
                <video controls src={`${process.env.REACT_APP_BACKEND_URL}/helpers/video/${video.file_id}`} width="500" height="500" />
            )}   
        </div>
    )
}

export default Play;