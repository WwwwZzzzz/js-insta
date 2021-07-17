import { actionPromise, store } from "../reducers/allReducers";
import { gqlQuery } from "../actions/ActionGQL";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { ImageSearchRounded } from "@material-ui/icons";
import { PostList } from "../pages/PageExplore";

const toQuery = (str, fields = ["title", "text", "login", "nick", '"_id"']) => {
    str = str.replace(/ +/g, " ").trim();
    str = "/" + str.split(" ").join("|") + "/";

    let arr = fields.map((s) => {
        return { [s]: str };
    });
    return { $or: arr };
};


const actionAllPost = (str = "") => async (dispatch) => {

    str = toQuery(str);

    await dispatch(
        actionPromise(
            'AllPost',
            gqlQuery(
                `
    query allPost($query:String) {
        PostFind(query:$query) {
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
            url,
            _id
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
  `
                ,
                { query: JSON.stringify([str, { limit: [12] }]) }
            ),
        )
    )
};

store.dispatch(actionAllPost());

export const CAllPost = connect((state) => ({ posts: state.promise?.AllPost?.payload || [], }))(PostList);
