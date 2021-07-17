import React from "react";
import { useExploreGridStyles } from "../styles";
import { getDefaultPost } from "../data";
import { LoadingLargeIcon } from "../icons";
import { Typography } from "@material-ui/core";
import { useGridPostStyles } from "../styles";
import { useHistory } from "react-router-dom";
import Layout from "../components/shared/Layout";
import ExploreSuggestions from "../components/ExploreSuggestionsComponent";
import { Randompic } from '../styles';

const Image = ({ _id, url }) => {
    const exploreImageStyleDiv = {
        maxWidth: "300px",
        maxHeight: "200px",
        objectFit: "cover",
        height: "100%",
        width: "100%",
    }

    const exploreImageStyle = {
        objectFit: "cover",
        height: "100%",
        width: "100%",
    }

    return (
        <div style={exploreImageStyleDiv}>
            <img src={url} style={exploreImageStyle} />
        </div>
    )
};


export const GridPost = ({ _id, title, owner, images }) => {
    const history = useHistory();
    const classes = useGridPostStyles();

    if (images === null) {
        images = [{}];
    }

    function handleOpenPostModal() {
        history.push({
            pathname: `/p/${_id}`,
            state: {
                modal: true,
            },
        });
    }

    return (
        <div onClick={handleOpenPostModal} className={classes.gridPostContainer}>
            <div className={classes.gridPostOverlay}>
                <div className={classes.gridPostInfo}>
                    <span className={classes.likes} />
                    <Typography>likes</Typography>
                </div>
                <div className={classes.gridPostInfo}>
                    <span className={classes.comments} />
                    <Typography>comments</Typography>
                </div>
            </div>
            {images.map((image) => (
                <Image key={image._id} {...image} />
            ))}
        </div>
    );
}

export const PostList = ({ posts }) => {
    const classes = useExploreGridStyles();
    let loading = false;

    return (
        <Layout>
            <ExploreSuggestions />
            <Typography
                color="textSecondary"
                variant="h5"
                component="h2"
                gutterBottom
                className={classes.typography}>
                Explore
            </Typography>
            {loading ? (
                <LoadingLargeIcon />
            ) : (
                <article className={classes.article}>
                    <div className={classes.postContainer}>
                        {posts.map((post) => (
                            <GridPost key={post._id} {...post} />
                        ))}
                    </div>
                </article>
            )}
        </Layout>
    );
}