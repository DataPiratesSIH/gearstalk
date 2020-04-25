import React, { useReducer } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from '../utils/LoadingSpinner';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import TuneIcon from '@material-ui/icons/Tune';

const record = ['None', 'Today', 'This Week', 'This Month', 'This Year']
const duration = ['None', 'Short (<4 minutes)', 'Medium (>4 minutes and <20 minutes)', 'Long (>20 minutes)']
const sort = ['Relevance', 'Upload Date', 'Duration']
const type = ['None', 'Processed', 'Unprocessed']

const useStyles = makeStyles((theme) => ({
    expand: {
      padding: '5px',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    expandIcon: {
        color: '#ffffff',
    },
}));

const FilterDialog = props => {
    const classes = useStyles();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const initialFilter = {
        record: 'None',
        duration: 'None',
        sort: 'Relevance',
        type: 'None'
    }

    const reducer = (state, action) => {
        switch(action.type) {
            case 'record':
                return {
                    ...state,
                    record: action.value
                }
            case 'duration':
                return {
                    ...state,
                    duration: action.value
                }
            case 'sort':
                return {
                    ...state,
                    sort: action.value
                }
            case 'type':
                return {
                    ...state,
                    type: action.value
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialFilter)

    const handleChange = (event) => dispatch({
        type: event.target.name,
        value: event.target.value
    });

    const filterHandler = async () => {
        clearError()
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/video/filter',
                'POST',
                JSON.stringify({
                    filter: state
                })
            )
            props.setVideos(responseData)
            props.handleClose()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="filter-dialog-title"
            aria-describedby="filter-dialog-description"
        >
            <DialogTitle id="filter-dialog-title">
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <TuneIcon />
                    <p style={{ paddingLeft: '10px' }}>Filter</p>
                </div> 
            </DialogTitle>
                <DialogContent>
                {isLoading && (
                    <LoadingSpinner />
                )}
                {error && (
                    <div style={{ marginTop: "20p", marginBottom: "20px" }}>
                        <Alert onClose={clearError} severity="error">
                            {error}
                        </Alert>
                    </div>
                )} 
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <div className={classes.expand}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                                    aria-controls="panel1a-content"
                                >
                                <Typography className={classes.heading}>RECORD DATE</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <FormControl component="fieldset">
                                        <RadioGroup  name="record" value={state.record} onChange={handleChange}>
                                            {record.map((r, index) =>
                                                <FormControlLabel key={index} value={r} control={<Radio />} label={r} />
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                    <div className={classes.expand}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                                    aria-controls="panel1a-content"
                                >
                                <Typography className={classes.heading}>DURATION</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <FormControl component="fieldset">
                                        <RadioGroup name="duration" value={state.duration} onChange={handleChange}>
                                            {duration.map((d, index) =>
                                                <FormControlLabel key={index} value={d} control={<Radio />} label={d} />
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                    <div className={classes.expand}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                                    aria-controls="panel1a-content"
                                >
                                <Typography className={classes.heading}>TYPE</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <FormControl component="fieldset">
                                        <RadioGroup  name="type" value={state.type} onChange={handleChange}>
                                            {type.map((t, index) =>
                                                <FormControlLabel key={index} value={t} control={<Radio />} label={t} />
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <div className={classes.expand}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                                    aria-controls="panel1a-content"
                                >
                                <Typography className={classes.heading}>SORT BY</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <FormControl component="fieldset">
                                        <RadioGroup  name="sort" value={state.sort} onChange={handleChange}>
                                            {sort.map((s, index) =>
                                                <FormControlLabel key={index} value={s} control={<Radio />} label={s} />
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </Grid>
                </Grid>
                </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} disabled={isLoading} color="primary">
                Cancel
            </Button>
            <Button onClick={filterHandler} disabled={isLoading} color="primary" autoFocus>
                Apply
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FilterDialog;