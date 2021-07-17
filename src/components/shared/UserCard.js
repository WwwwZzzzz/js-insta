import React from "react";
import { useUserCardStyles } from "../../styles";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";
import { defaultUser } from "../../data";

export const UserCardFeed = ({ user = defaultUser, avatarSize = 44 }) => {
  const classes = useUserCardStyles({ avatarSize });

  const { nick, _id, avatar: {url: profile_image=defaultUser.profile_image}={}, username } = user;
 
  if (user.login === null) {
    user.login = "username";
  }

  return (
    <div className={classes.wrapper}>
      <Link to={`/user:${user._id}`}>
        <Avatar
          src={profile_image}
          alt="User avatar"
          className={classes.avatar} />
      </Link>
      <div className={classes.nameWrapper}>
        <Link to={`/user:${user._id}`}>
          <Typography variant="subtitle2" className={classes.typography}>
            {user.login}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.typography}>
          {user.login}
        </Typography>
      </div>
    </div>
  );
}

function UserCard({ user = defaultUser, avatarSize = 44 }) {
  const classes = useUserCardStyles({ avatarSize });

  const { name, profile_image, username } = user;

  return (
    <div className={classes.wrapper}>
      <Link to={`/${username}`}>
        <Avatar
          src={profile_image}
          alt="User avatar"
          className={classes.avatar}
        />
      </Link>
      <div className={classes.nameWrapper}>
        <Link to={`/${username}`}>
          <Typography variant="subtitle2" className={classes.typography}>
            {username}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.typography}
        >
          {name}
        </Typography>
      </div>
    </div>
  );
}

export default UserCard;
