import { gqlQuery } from "../actions/ActionGQL";
import { connect } from "react-redux";
import { actionPromise, store } from "../reducers/allReducers";
import history from "../history";
import ProfilePicture from "../components/shared/ProfilePicture"

const actionGQLFindUsers = () =>
  actionPromise(
    'followingById',
    gqlQuery(
      `
    query UserFind($query:String) {
      UserFind(query:$query) {
         _id,
         avatar {url},
         nick,
         login
      }
    }    
  `
    ),
  );

store.dispatch(actionGQLFindUsers());

export const CAllPost = connect((state) => ({ posts: state.promise?.AllPost?.payload || [], }))(ProfilePicture);