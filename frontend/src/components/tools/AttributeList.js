import React from 'react';
import { useAttribute } from '../context/attribute-context';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ColorCircle from './ColorCircle';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const FeatureItem = props => {
    // eslint-disable-next-line
    const [{ attributes }, dispatch] = useAttribute();

    const handleClothChange = event => {
        dispatch({
            type: 'updateFeature',
            field: 'cloth',
            value: event.target.value,
            uid: props.id
        })
    };

    return (
        <Grid container spacing={2}>
            <Grid item xl={2} lg={2} md={2} xs={2} sm={2}>
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center' 
                    }}>
                    <ColorCircle id={props.id} color={props.color} />
                </div>
            </Grid>
            <Grid item xl={8} lg={8} md={8} xs={8} sm={8}>
                <Select
                    fullWidth
                    value={props.cloth}
                    onChange={handleClothChange}
                >
                    <MenuItem value="Shirt">Shirt</MenuItem>
                    <MenuItem value="Pant">Pant</MenuItem>
                    <MenuItem value="Underwear">Underwear</MenuItem>
                </Select>
            </Grid>
            <Grid item xl={2} lg={2} md={2} xs={2} sm={2}>
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center' 
                }}>
                    <IconButton onClick={() => dispatch({
                        type: 'deleteFeature',
                        did: props.id
                    })}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Grid>                    
        </Grid>
    )

};

const FeatureList = props => {
    return (
        <div>
            {props.items.map(feature => 
                    <FeatureItem 
                        key={feature.id} 
                        id={feature.id}
                        cloth={feature.cloth}
                        color={feature.color}
                    />
                )}
        </div>
    )
}

const AttributeItem = props => {
    const classes = useStyles();
    // eslint-disable-next-line
    const [{ attributes }, dispatch] = useAttribute();

    const handleGenderChange = event => {
        dispatch({
            type: 'updateFeature',
            field: 'gender',
            value: event.target.value,
            uid: props.id
        })
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xl={4} lg={4} md={4} xs={4} sm={4}>
                    <Typography color='primary' variant="h6">
                        Person {props.index + 1}
                    </Typography>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={6} sm={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                        style={{ width: "100px" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.gender}
                        onChange={handleGenderChange}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Any">Any</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} xs={2} sm={2}>
                    <IconButton style={{ padding: "1px" }} onClick={() => dispatch({
                        type: 'deletePerson',
                        pid: props.id
                    })}>
                        <DeleteForeverIcon color='error' fontSize='large' />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xl={2} lg={2} md={2} xs={2} sm={2}>
                    <div style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center' 
                    }}>
                        <IconButton style={{ padding: "1px" }} onClick={() => dispatch({
                            type: 'addFeature',
                            pid: props.id
                        })}>
                            <AddBoxIcon />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xl={10} lg={10} md={10} xs={10} sm={10}>
                    <FeatureList items={props.features} />
                </Grid>
            </Grid>
            <hr></hr>
        </React.Fragment>
    )
}

const AttributeList = props => {
    return (
        <div>
            {props.items.map((attribute, index) => 
                    <AttributeItem 
                        key={attribute.id} 
                        id={attribute.id}
                        index={index}
                        gender={attribute.gender}
                        features={attribute.features}
                    />
                )}
        </div>
    )
}

export default AttributeList;