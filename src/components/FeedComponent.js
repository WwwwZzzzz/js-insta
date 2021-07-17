import React, { useState } from "react";
import { useFeedPostStyles } from "../styles";
import { UserCardFeed } from "./shared/UserCard";
import { MoreIcon, ShareIcon, LikeIcon, CommentIcon, UnlikeIcon, SaveIcon, RemoveIcon } from "../icons";
import { Link } from "react-router-dom";
import { Button, Typography, Hidden, Divider, TextField, Box } from "@material-ui/core";
import { Redirect } from "react-router-dom";
// import Modal from 'react-bootstrap/Modal';

function LikeButton({ likes }) {
  const classes = useFeedPostStyles();
  const [liked, setLiked] = useState(false);
  //capitalized Icon because it's a component
  const Icon = liked ? UnlikeIcon : LikeIcon;

  // For animation
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;

  function handleLike() {
    setLiked(true);
  }

  function handleUnlike() {
    setLiked(false);
  }

  return <Icon className={className} onClick={onClick} />;
}


const PostImage = ({ text, url }) => {
  const classes = useFeedPostStyles();

  const exploreImageStyleDiv = {
    minWidth: "600px",
    minHeight: "500px",
    maxWidth: "600px",
    maxHeight: "500px",
    objectFit: "cover",
    height: "100%",
    width: "100%",
    background: `url("https://source.unsplash.com/600x500/?")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }

  const exploreImageStyle = {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    minWidth: "600px",
    minHeight: "500px",
    maxWidth: "600px",
    maxHeight: "500px",
  }

  return (
    <div style={exploreImageStyleDiv}>
      <img src={url} className={classes.image} style={exploreImageStyle} />
    </div>
  )
}

const Post = ({ title, text, _id, createdAt, likes, images, owner, comments }) => {
  const classes = useFeedPostStyles();
  const [toggleOptions, setToggleOptions] = useState(false);

  if (images === null) {
    images = [{}];
  }

  function handleToggleOptions() {
    setToggleOptions(true);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (setShow === true) {
    show.style = {
      backgroundColor: "#000"
    }
  }

  return (
    <>
      {/* <Link to={{ pathname: "/modal", state: { modal: true }, }} className="link" > */}
        <article className={classes.article} onClick={handleShow}>
          <div className={classes.postHeader}>
            <UserCardFeed user={owner} />
            <p>{_id}</p>
            <MoreIcon onClick={handleToggleOptions} className={classes.MoreIcon} />
          </div>
          <div>
            {images.map(image => <PostImage key={image._id} {...image} />)}
          </div>
          <div className={classes.postButtonsWrapper}>
            <div className={classes.postButtons}>
              <LikeIcon />
              <Link to="/">
                <CommentIcon />
              </Link>
              <ShareIcon />
            </div>
          </div>
          <Box ml="20px">
            <Typography variant="body1">
              {title}
            </Typography>
            <Typography variant="body1">
              {text}
            </Typography>
          </Box>
          <div className={classes.postButtonsWrapper}>
            <div>{comments}</div>
            <Link to="/">
              <Typography className={classes.commentsLink} variant="body2" component="div">
                View all comments
              </Typography>
            </Link>
            <Typography color="textSecondary" className={classes.datePosted}>
              8 HOURS AGO
            </Typography>
          </div>
        </article>
      {/* </Link> */}
      {/* <Modal show={show} onHide={handleClose} className={classes.modal}>
        <Modal.Header className={classes.modalHeader}>
          <h2>Modal heading</h2>
          <button className={classes.modalBtn} onClick={handleClose}>x</button>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}

export const Feed = ({ status, posts }) => {
  if (typeof localStorage.token == 'undefined') {
    return <Redirect to="/login" />;
  }
  if (status === "REJECTED") {
    return (
      <p>
        Rejected
      </p>
    )
  }
  if (status === 'PENDING') {
    return (
      <p></p>
    )
  }
  if (status === 'RESOLVED') {
    return (
      <div>
        {posts.map(post => <Post key={post._id} {...post} />)}
      </div>
    )
  }

  return (
    <div></div>
  )
}

