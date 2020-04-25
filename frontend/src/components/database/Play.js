import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Play = () => {
    const params = useParams('/play/:oid');
    const { oid } = params;

    useEffect(() => {
        console.log(oid)
    }, [oid])

    return (
        <div>
            hi
        </div>
    )
}

export default Play;