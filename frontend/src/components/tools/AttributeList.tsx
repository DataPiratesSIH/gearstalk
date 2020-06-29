import React, { useState } from "react";
import { useAttribute } from "../context/attribute-context";
import {
  IconButton,
  Grid,
  Typography,
  Chip,
  Avatar,
  Popover,
  Divider
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import ColorCircle from "./ColorCircle";

import { Feature } from "../../types";
import { stopwords } from "../utils/utils";

interface AttributeItemProps {
  key: string;
  id: string;
  index: number;
  labels: string[];
  colors: { hex: string }[];
}

const AttributeItem: React.FC<AttributeItemProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // eslint-disable-next-line
  const [{ attributes }, dispatch] = useAttribute();

  return (
    <React.Fragment>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ width: "300px" }}>
          {stopwords.map((sw) => (
            <>
              {!props.labels.includes(sw) && (
                <Chip
                  style={{ margin: "5px 10px", cursor: "pointer" }}
                  color="secondary"
                  label={sw}
                  avatar={<Avatar>{sw.charAt(0)}</Avatar>}
                  onClick={() => {
                    dispatch({
                      type: "addLabel",
                      pid: props.id,
                      value: sw,
                    });
                    handleClose();
                  }}
                />
              )}
            </>
          ))}
        </div>
      </Popover>
      <Grid container spacing={2}>
        <Grid item xl={4} lg={4} md={4} xs={4} sm={4}>
          <Typography color="primary" variant="h6">
            Person {props.index + 1}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          {props.labels.map((label) => (
            <Chip
              style={{ margin: "5px 3px", color: "#1C233E", fontWeight: 600 }}
              color="primary"
              label={label}
              onDelete={() =>
                dispatch({
                  type: "removeLabel",
                  pid: props.id,
                  value: label,
                })
              }
              avatar={<Avatar>{label.charAt(0)}</Avatar>}
            />
          ))}
          <IconButton
            aria-describedby={id}
            style={{ padding: "1px", color: "#fff" }}
            onClick={handleClick}
          >
            <AddBoxIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <Grid container spacing={1}>
            {props.colors.map((color, index) => (
              <Grid item xs={6}>
                <ColorCircle id={props.id} index={index} color={color} />
              </Grid>
            ))}
          </Grid>
          <Grid container style={{ marginTop: "10px" }} spacing={1}>
            <Grid item xs={6}>
              {" "}
              <IconButton
                aria-describedby={id}
                style={{ padding: "1px" }}
                color='primary'
                onClick={() =>
                  dispatch({
                    type: "removeColor",
                    pid: props.id,
                  })
                }
                disabled={props.colors.length === 0}
              >
                <IndeterminateCheckBoxIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <IconButton
                aria-describedby={id}
                style={{ padding: "1px" }}
                color='primary'
                onClick={() =>
                  dispatch({
                    type: "addColor",
                    pid: props.id,
                    value: { hex: "#000" },
                  })
                }
                disabled={props.colors.length > 3}
              >
                <AddBoxIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px", backgroundColor: "#2db1e1"}} />
    </React.Fragment>
  );
};

interface AttributeListProps {
  items: Feature[];
}

const AttributeList: React.FC<AttributeListProps> = (props) => {
  return (
    <div>
      {props.items.map((attribute, index: number) => (
        <AttributeItem
          key={attribute.id}
          id={attribute.id}
          index={index}
          labels={attribute.labels}
          colors={attribute.colors}
        />
      ))}
    </div>
  );
};

export default AttributeList;
