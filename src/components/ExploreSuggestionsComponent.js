import React from "react";
import { useExploreSuggestionsStyles } from "../styles";
import { Hidden, Typography } from "@material-ui/core";
import FollowSuggestions from "./shared/FollowSuggestions";

function ExploreSuggestions() {
  const classes = useExploreSuggestionsStyles();

  return (
    <Hidden xsDown>
      <div className={classes.container}>
        <Typography
          color="textSecondary"
          variant="h5"
          component="h2"
          className={classes.typography}
        >
          Discover people
          <FollowSuggestions hideHeader />
        </Typography>
      </div>
    </Hidden>
  );
}

export default ExploreSuggestions;
