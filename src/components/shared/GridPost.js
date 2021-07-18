import { Typography } from "@material-ui/core";
import React from "react";
import { useGridPostStyles } from "../../styles";
import { useHistory } from "react-router-dom";

function GridPost({ _id, images }) {
  const history = useHistory();
  const classes = useGridPostStyles();
  // const { media, likes, comments, id } = post;
  if (images === null) {
    images = [{}];
  }
  return (
    <div className={classes.gridPostContainer}>
      <div className={classes.gridPostOverlay}>
        <div className={classes.gridPostInfo}>
          <span className={classes.likes} />
          <Typography>132</Typography>
        </div>
        <div className={classes.gridPostInfo}>
          <span className={classes.comments} />
          <Typography>131</Typography>
        </div>
      </div>
      {images.map(image =>  <img src={'/' + image.url}  className={classes.image} />)}
    </div>
  );
}

export default GridPost;
