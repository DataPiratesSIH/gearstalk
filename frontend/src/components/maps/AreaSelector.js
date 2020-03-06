import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Container from '@material-ui/core/Container';

import MapChart from './MapChart';
import MapDialog from './MapDialog';

import './AreaSelector.css';

const AreaSelector = () => {
    const [content, setContent] = useState("");
    const [STName, setSTName] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    return (
        <React.Fragment>
            <MapDialog show={show} StateName={STName} closeModal={handleClose} />

            <Container>
                <div className="map-chart">
                    <MapChart setTooltipContent={setContent} setStateName={setSTName} setShowDistrict={setShow} />
                    <ReactTooltip>{content}</ReactTooltip>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default AreaSelector;