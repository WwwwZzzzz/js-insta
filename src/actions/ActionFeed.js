
import { gqlQuery } from "../actions/ActionGQL";
import { connect } from "react-redux";
import { actionPromise, store } from "../reducers/allReducers";
import { Feed } from "../components/FeedComponent";
import { Redirect } from "react-router-dom";
import { browserHistory } from 'react-router'
import history from "../history";

//60cdbf6734d8b37f3cf7523e
const actionGQLFollowingById = (_id) =>
  actionPromise(
    'followingById',
    gqlQuery(
      `
    query UserFindOne($query:String) {
      UserFindOne(query:$query) {
       following {
         _id
       }
      }
    }    
  `,
      { query: JSON.stringify([{ _id }]) },
    ),
  );
//___owner 5d6fccfc5fce6722147978f2
const actionGQLPostsByFollowingId = (following) =>
  actionPromise(
    'postsByFollowingId',
    gqlQuery(
      `
    query postsByFollowingId($q:String) {
        PostFind(query:$q) {
          title,
          text,
          _id,
          createdAt,
          likes {
           owner {
              _id,
              login,
              avatar {
                  url
              }
            }
          }
          images {
            text,
            url
          }
          owner {
            _id,
            login,
            avatar {
                url
            }
          }
        }
      }   
  `,
      { q: JSON.stringify([{ ___owner: { $in: following } }]) },
    ),
  );

const actionGetPosts = () => async (dispatch, getState) => {
  const myId = getState().auth.data?.tokenJson?.sub.id
  if (typeof localStorage.token == 'undefined') {
    return history.push('/login');
  }
  let followingResult = await dispatch(actionGQLFollowingById(myId));
  let followingArray = [];
  for (const [key, value] of Object.entries(followingResult.following)) {
    followingArray.push(value._id);
  }

  return await dispatch(actionGQLPostsByFollowingId(followingArray));
};

  store.dispatch(actionGetPosts());


export const CFeed = connect((state) => ({ status: state.promise?.postsByFollowingId?.status, posts: state.promise?.postsByFollowingId?.payload }))(Feed)

export const actionPromiseFeed = () =>
  actionPromise(
    "feed",
    gqlQuery(
      `query {
        PostFind(query:"[{}]") {
          title,
          text,
          _id,
          createdAt,
          likes {
           owner {
              _id,
              login,
              avatar {
                  url
              }
            }
          }
          images {
            text,
            url
          }
          owner {
            _id,
            login,
            avatar {
                url
            }
          }
        }
      }`
    )
  );


