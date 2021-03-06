import React, { useState } from "react";
import { connect } from "react-redux";
import { useProfileTabsStyles } from "../../styles";
import { Hidden, Divider, Tabs, Tab, Typography } from "@material-ui/core";
import { GridIcon, SaveIcon } from "../../icons";
import GridPost from "../shared/GridPost";

function ProfileTabs({ isOwner, user, _id }) {
  const classes = useProfileTabsStyles();
  const [value, setValue] = useState(0);

  return (
    <>
      <section className={classes.section}>
        <Hidden xsDown>
          <Divider />
        </Hidden>
        <Hidden xsDown>
          <Tabs
            value={value}
            onChange={(_, value) => setValue(value)}
            centered
            classes={{
              indicator: classes.tabsIndicator,
            }}
          >
          </Tabs>
        </Hidden>
        <Hidden smUp>{user.posts.length === 0 && <Divider />}</Hidden>
        {value === 0 && <ProfilePosts user={user} isOwner={isOwner} />}
        {value === 1 && <SavedPosts isOwner={isOwner} />}
      </section>
    </>
  );
}

function ProfilePosts({ user, isOwner }) {
  const classes = useProfileTabsStyles();

  if (user.posts.length === 0) {
    return (
      <section className={classes.profilePostsSection}>
        <div className={classes.noContent}>
          <div className={classes.uploadPhotoIcon} />
          <Typography variant="h4">
            {isOwner ? "Upload a Photo" : "No Photos"}
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <article className={classes.article}>
      <div className={classes.postContainer}>
        {user.posts.map((post) => (
          <GridPost key={post.id} post={post} />
        ))}
      </div>
    </article>
  );
}

function SavedPosts({ isOwner }) {
  const classes = useProfileTabsStyles();

  return (
    <section className={classes.savedPostsSection}>
      <div className={classes.noContent}>
        <div className={classes.savePhotoIcon} />
        <Typography variant="h4">Save</Typography>
        <Typography align="center">
          Save photos and videos that you want to see again. No one is notified,
          and only you can see what you've saved.
        </Typography>
      </div>
    </section>
  );
}

export default ProfileTabs;
