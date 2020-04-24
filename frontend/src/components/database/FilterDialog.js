import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
    expand: {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    expandIcon: {
        color: '#ffffff',
    }
}));

const FilterDialog = props => {
    const classes = useStyles();

  return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="filter-dialog-title"
        aria-describedby="filter-dialog-description"
      >
        <DialogTitle id="filter-dialog-title">{"Filter"}</DialogTitle>
            <DialogContent>
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
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
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
                            <Typography className={classes.heading}>FEATURES</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
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
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
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
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </Grid>
            </Grid>
            </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default FilterDialog;