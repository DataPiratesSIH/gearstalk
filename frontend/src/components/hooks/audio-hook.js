import { useEffect, useState, useRef, useCallback } from "react";
import MediaStreamRecorder from "msr";

const useToggle = initialValue => {
  const [toggleValue, setToggleValue] = useState(initialValue);
  const toggler = useCallback(() => setToggleValue(toggleValue => !toggleValue), []);

  return [toggleValue, toggler];
};

const mediaOptions = {
    mimeType: 'audio/wav',
    bufferSize: 2048,
    sampleRate: 44100,
}

const useRecorder = (open) => {
    const [audioURL, setAudioURL] = useState([]);
    const [isRecording, toggleIsRecording] = useToggle(false);

    const recorder = useRef({});
    const stream = useRef({});

    useEffect(() => {
        if (open) {
            navigator.mediaDevices
            .getUserMedia({
            audio: true,
            video: false
            })
            .then(function(str) {
            console.log("ready to record!");
            stream.current = str;
            recorder.current = new MediaStreamRecorder(str);
            recorder.current.mimeType = mediaOptions.mimeType
            recorder.current.bufferSize = mediaOptions.bufferSize
            recorder.current.sampleRate = mediaOptions.sampleRate
    
            // listen to dataavailable, which gets triggered whenever we have
            // an audio blob available
            recorder.current.ondataavailable = blob => {
                if (blob) {
                    setAudioURL(audioURL => [...audioURL, blob]);
                }
            }
            //  recorder.current.addEventListener("dataavailable", onRecordingReady);
            })
            .catch(err => console.log(err));
        }
    }, [open]);

    //So I'm doing useCallback and I hope that's moral
    const startRecording = useCallback(() => {
        recorder.current.start();
        toggleIsRecording();
    }, [recorder, toggleIsRecording]);

    const stopRecording = useCallback(() => {
        recorder.current.stop();
        setAudioURL([])
        toggleIsRecording();
    }, [recorder, toggleIsRecording]);

    const clearRecording = useCallback(() => {
        if (recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop()
            setAudioURL([])
            toggleIsRecording()
            stream.current.getAudioTracks().forEach((track) => {
                track.stop()
            })
        }
    }, [recorder, stream, toggleIsRecording])

    return { audioURL, isRecording, startRecording, stopRecording, clearRecording };
};

export default useRecorder;
