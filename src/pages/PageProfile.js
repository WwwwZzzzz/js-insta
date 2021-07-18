import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useProfilePageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import { defaultCurrentUser } from "../data";
import { Hidden, Card, CardContent, Button, Typography, Dialog, Zoom, Divider, DialogTitle, Avatar, } from "@material-ui/core";
import ProfilePicture from "../components/shared/ProfilePicture";
import { Link } from "react-router-dom";
import { GearIcon } from "../icons";
import ProfileTabs from "../components/profile/ProfileTabs";
import { actionGetOwnerPosts } from "../actions/ActionProfile";
import { actionPromise, store } from "../reducers/allReducers";
import { useProfileTabsStyles } from "../styles";
import GridPost from "../components/shared/GridPost";

const PageProfile = ({ match: { params: { _id }, }, getData,
}) => {
  useEffect(() => {
    getData(_id);
  }, [_id]);

  const isOwner = false;
  const classes = useProfilePageStyles();
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  function handleOptionsMenuClick() {
    setShowOptionsMenu(true);
  }

  function handleCloseMenu() {
    setShowOptionsMenu(false);
  }

  return (
    <Layout
      title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`}
    >

      <div className={classes.container}>
        <Hidden xsDown>
          <Card style={{ display: "flex", alignItems: "center", padding: "0 50px", boxShadow: "0px -2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)" }}>
            <ProfilePicture isOwner={isOwner} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection
                handleOptionsMenuClick={handleOptionsMenuClick}
                user={defaultCurrentUser}
                isOwner={isOwner}
              />
              <PostCountSection user={defaultCurrentUser} />
              <NameBioSection user={defaultCurrentUser} />
            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card className={classes.cardSmall}>
            <CardContent>
              <section className={classes.sectionSmall}>
                <ProfilePicture size={77} isOwner={isOwner} />
                <ProfileNameSection
                  handleOptionsMenuClick={handleOptionsMenuClick}
                  user={defaultCurrentUser}
                  isOwner={isOwner}
                />
              </section>
              <NameBioSection user={defaultCurrentUser} />
            </CardContent>
            <PostCountSection user={defaultCurrentUser} />
          </Card>
        </Hidden>
        {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
        {/* <ProfileTabs user={defaultCurrentUser} isOwner={isOwner} /> */}
        <CProfilePostsTest />
      </div>
    </Layout>
  );
}

const TestPost = ({ _id }) => {
  return (
    <>
      <div>{_id}</div>
    </>
  );
}

const TestPosts = ({ status, posts }) => {
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
        {posts.map(post => <TestPost key={post._id} {...post} />)}
      </div>
    )
  }
  return (
    <>
      <div>132131</div>
    </>
  );
}


function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
  const classes = useProfilePageStyles();
  const [showUnFollowDialog, setUnFollowDialog] = useState(false);

  let followButton;
  const isFollowing = true;
  const isFollower = false;

  if (isFollowing) {
    followButton = (
      <Button onClick={() => setUnFollowDialog(true)} variant="outlined" className={classes.button} style={{ textTransform: 'capitalize' }} >
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button variant="contained" className={classes.button}>
        Follow back
      </Button>
    );
  } else {
    followButton = (
      <Button variant="contained" className={classes.button}>
        Follow
      </Button>
    );
  }

  return (
    <>
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>{user.username}</Typography>
          {isOwner ? (
            <>
              <Link to="/accounts/edit">
                <Button variant="outlined">Edit profile</Button>
              </Link>
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            </>
          ) : (
            <>{followButton}</>
          )}
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.usernameDivSmall}>
            <Typography className={classes.username}>
              {user.username}
            </Typography>
            {isOwner && (
              <div onClick={handleOptionsMenuClick} className={classes.settingsWrapper} >
                <GearIcon className={classes.settings} />
              </div>
            )}
          </div>
          {isOwner ? (
            <Link to="/accounts/edit">
              <Button variant="outlined" style={{ width: "100%" }}>
                Edit profile
              </Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
      {showUnFollowDialog && (
        <UnfollowDialog user={user} onClose={() => setUnFollowDialog(false)} />
      )}
    </>
  );
}

function UnfollowDialog({ onClose, user }) {
  const classes = useProfilePageStyles();
  return (
    <Dialog open classes={{ scrollPaper: classes.unfollowDialogScrollPaper }} onClose={onClose} TransitionComponent={Zoom} >
      <div className={classes.wrapper}>
        <Avatar
          src={user.profile_image}
          alt={`${user.username}'s avatar`}
          className={classes.avatar}
        />
      </div>
      <Typography
        align="center"
        className={classes.unfollowDialogText}
        variant="body2"
      >
        Unfollow @{user.name}?
      </Typography>
      <Divider />
      <Button className={classes.unfollowButton}>Unfollow</Button>
      <Divider />
      <Button onClick={onClose} className={classes.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  );
}

function PostCountSection({ user }) {
  const classes = useProfilePageStyles();
  const options = ["posts", "followers", "following"];

  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={classes.followingSection}>
        {options.map((option) => (
          <div key={option} className={classes.followingText}>
            <Typography className={classes.followingCount}>
              {user[option] && user[option].length}
            </Typography>
            <Hidden xsDown>
              <Typography>{option}</Typography>
            </Hidden>
            <Hidden smUp>
              <Typography color="textSecondary">{option}</Typography>
            </Hidden>
          </div>
        ))}
      </section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  );
}

function NameBioSection({ user }) {
  const classes = useProfilePageStyles();

  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{user.name}</Typography>
      <Typography>{user.bio}</Typography>
    </section>
  );
}

function OptionsMenu({ handleCloseMenu }) {
  const classes = useProfilePageStyles();
  const [showLogOutMessage, setLogOutMessage] = useState(false);

  function handleLogOutClick() {
    setLogOutMessage(true);
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper,
      }}
      TransitionComponent={Zoom}
    >
      {showLogOutMessage ? (
        <DialogTitle className={classes.dialog}>
          Logging out
          <Typography color="textSecondary">
            You need to log back in to continue using Instagram
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Change password" />
          <OptionsItem text="Nametag" />
          <OptionsItem text="Apps and Websites" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem onClick={handleLogOutClick} text="Log out" />
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  );
}

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{ padding: "12px 8px" }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  );
}

// ---------------------------------------------


// function ProfileTabs({ isOwner, user, _id }) {
//   const classes = useProfileTabsStyles();
//   const [value, setValue] = useState(0);

//   return (
//     <>
//       <section className={classes.section}>
//         <Hidden xsDown>
//           <Divider />
//         </Hidden>
//         <Hidden xsDown>
//           <Tabs
//             value={value}
//             onChange={(_, value) => setValue(value)}
//             centered
//             classes={{
//               indicator: classes.tabsIndicator,
//             }}
//           >
//           </Tabs>
//         </Hidden>
//         <Hidden smUp>{user.posts.length === 0 && <Divider />}</Hidden>
//         {value === 0 && <ProfilePosts user={user} isOwner={isOwner} />}
//         {value === 1 && <SavedPosts isOwner={isOwner} />}
//       </section>
//     </>
//   );
// }

// const ProfilePosts({ status, posts }) {
//   const classes = useProfileTabsStyles();
//   console.log(status)
//   return (
//     <article className={classes.article}>
//       <div className={classes.postContainer}>
//         {posts.map((post) => (
//           <GridPost key={post.id} post={post} />
//         ))}
//       </div>
//     </article>
//   );
// }

const ProfilePosts = ({ status, posts }) => {
  const classes = useProfileTabsStyles();

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
    console.log(posts)
    return (
      <article className={classes.article}>
        <div className={classes.postContainer}>
          {posts.map((post) => (
            <GridPost key={post._id} {...post} />
          ))}
        </div>
      </article>
    )
  }
  return (
    <>
      <div>132131</div>
    </>
  );
}

// function SavedPosts({ isOwner }) {
//   const classes = useProfileTabsStyles();

//   return (
//     <section className={classes.savedPostsSection}>
//       <div className={classes.noContent}>
//         <div className={classes.savePhotoIcon} />
//         <Typography variant="h4">Save</Typography>
//         <Typography align="center">
//           Save photos and videos that you want to see again. No one is notified,
//           and only you can see what you've saved.
//         </Typography>
//       </div>
//     </section>
//   );
// }

// ---------------------------------------------

export const CProfilePosts = connect(null, { getData: actionGetOwnerPosts })(PageProfile);
const CProfilePostsTest = connect((state) => ({ status: state.promise?.postsByOwnerId?.status, posts: state.promise?.postsByOwnerId?.payload }))(ProfilePosts);
