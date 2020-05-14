import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactTooltip from 'react-tooltip';
import StateChart from './StateChart';

interface Props {
    show: boolean;
    StateName: string;
    closeModal: () => void;
}

const MapDialog: React.FC<Props> = props => {
    const [contentD, setContentD] = useState("");
    const [DTName, setDTName] = useState("");
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<false | "md" | "xs" | "sm" | "lg" | "xl" | undefined>("md");

    // eslint-disable-next-line
    const handleMaxWidthChange = event => {
        setMaxWidth(event.target.value);
    };

    // eslint-disable-next-line
    const handleFullWidthChange = event => {
        setFullWidth(event.target.checked);
    };

    return (
        <Dialog 
            fullWidth={fullWidth}
            maxWidth={maxWidth} 
            open={props.show} 
            onClose={props.closeModal}
        >
            <DialogTitle>{props.StateName}</DialogTitle>
            <DialogContent>
                <div className="map-chart">
                    <StateChart setTooltipContent={setContentD} setDistrictName={setDTName} selectedState={props.StateName} />
                    <ReactTooltip>{contentD}</ReactTooltip>
                </div>
            </DialogContent>
            <DialogActions>
                {DTName}
                <Button color="primary" onClick={props.closeModal}>
                    Close
                </Button>
                <Button color="secondary" onClick={props.closeModal}>
                    Go
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default MapDialog;
