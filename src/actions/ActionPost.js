import { actionPromise } from "../reducers/allReducers";
import { gqlQuery } from "../actions/ActionGQL"

export const actionGQLPostById = (_id) =>
    actionPromise(
        'postById',
        gqlQuery(
            `
        query postById($query: String){
            PostFindOne(query:$query) {
              _id,
              createdAt,
              title,
              images {
                text,
                url
              },
              comments {
                _id,
                text
              }
            }
          }    
        `,
            { query: JSON.stringify([{ _id }]) },
        ),
    );

export const actionCreatePost = (name, description) => {
    return actionPromise('createPost', gqlQuery(`
        mutation createPost($name: String, $description: String) {
          PostUpsert(playlist:{
            title: $name, text: $description
          }) {
            _id, title, description
          }
        } 
        `, { name, description }))
}

export const actionPostById = (_id) => async (dispatch, getState) => {
  await dispatch(actionGQLPostById(_id));
  console.log(getState().promise?.postById.payload)
  return await getState().promise?.postById.payload;
};