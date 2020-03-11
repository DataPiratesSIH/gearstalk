import React, { useState, useCallback } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Cropper = props => {
    const [imgRef, setImgRef] = useState(null);
    const [crop, setCrop] = useState({
        // Cropping Occurs in 1:1 Aspect Ratio
        aspect: 9 / 16,
        unit: '%',
        x: 25,
        y: 25,
        width: 50,
    });

    const onLoad = useCallback(img => {
        setImgRef(img);
    }, []);

    const makeClientCrop = crop => {
        if (imgRef && crop.width && crop.height) {
            const croppedImageUrl = getCroppedImg(imgRef, crop);
            props.setCroppedSrc(croppedImageUrl);
        }
    };

    const getCroppedImg = (image, crop) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
        );

        return canvas.toDataURL("image/jpeg");
    };

    makeClientCrop(crop);

    return (
        <ReactCrop
            src={props.src}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={makeClientCrop}
        />
    );
}

export default Cropper;