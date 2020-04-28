import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import useRecorder from '../hooks/audio-hook';
import MicIcon from './MicIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const MicDialog = ({ open, onText, handleClose }) => {
    const [text, setText] = useState("")
    let { audioURL, isRecording, startRecording, stopRecording, clearRecording } = useRecorder(open);
    const { error, sendRequest, clearError, setErrorText } = useHttpClient();

    useEffect(() => {
        setText("")
    }, [open])

    const toggleVoice = async () => {
        if (isRecording) {
            stopRecording()
            try {
                let data = new FormData()
                let blob = new Blob(audioURL, { type: 'audio/wav' })
                data.append('speech', blob)
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/helpers/speech',
                    'POST',
                    data
                )
                setText(text => text + responseData.message)
                if (responseData.message === "") {
                    setErrorText("Can't hear. Try Again!")
                }
            } catch (err) {
                setErrorText("Network Error!")
            }
        } else {
            if (error) {
                clearError()
            }
            startRecording()
        }
    }

    const closeMic = () => {
        if (text !== "") {
            onText(text)
        }
        clearRecording()
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={closeMic}
            aria-labelledby="mic-dialog-title"
            aria-describedby="mic-dialog-description"
        >
            <DialogTitle style={{ textAlign: 'center' }} id="mic-dialog-title">
                {error ? error : "Tap and Talk"}
            </DialogTitle>
            <DialogContent>
                <div className="mic-position" onClick={toggleVoice}>
                    <MicIcon isRecording={isRecording} />
                </div>
           </DialogContent>
            <div style={{ padding: '5px 10px 15px', textAlign: 'center' }}>
                {text}
            </div>
        </Dialog>
    );
}

export default MicDialog;