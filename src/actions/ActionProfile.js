import { gqlQuery } from "../actions/ActionGQL";
// import { connect } from "react-redux";
import { actionPromise, store } from "../reducers/allReducers";
// import { PageProfile } from "../pages/PageProfile";
// import { useParams } from "react-router-dom";
// import history from "../history";
// import { Router, Route, browserHistory } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const actionGQLPostsByOwnerId = (ids) =>
  actionPromise(
    'postsByOwnerId',
    gqlQuery(
      `
  query postsByOwnerId($q:String) {
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
      { q: JSON.stringify([{ ___owner: { $in: ids } }]) },
    ),
  );

export const actionGetOwnerPosts = (_id) => async (dispatch, getState) => {

  let ids = [_id];

  return await dispatch(actionGQLPostsByOwnerId(ids));
};

