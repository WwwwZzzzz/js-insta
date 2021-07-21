
import { actionPromise, store } from "../reducers/allReducers";
import { gqlQuery } from "../actions/ActionGQL";

const toQuery = (str, fields = ["title", "text", "login", "nick", '"_id"']) => {
    str = str.replace(/ +/g, " ").trim();
    str = "/" + str.split(" ").join("|") + "/";

    let arr = fields.map((s) => {
        return { [s]: str };
    });
    return { $or: arr };
};


export const actionSearchUser = (_id = "", str = "") => async (dispatch) => {
    let searchStr;
    str = toQuery(str);
  
    if (_id) {
        searchStr = { $and: [{ ___owner: _id }] };
        searchStr.$and.push(str);
    } else searchStr = { ...str };
  
    let searchData = await dispatch(
        actionPromise(
            "searchUser",
            gqlQuery(
                `query search( $query:String){
                UserFind(query:$query) {
                    _id
                    nick
                    login
                    avatar {url}
              }
            }`,
                { query: JSON.stringify([searchStr]) }
            )
        )
    );
  };