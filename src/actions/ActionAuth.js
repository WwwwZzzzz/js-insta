import { actionPromise } from "../reducers/allReducers";
import { gqlQuery } from "../actions/ActionGQL"

export const actionAuthLogin = (token) => ({ type: "LOGIN", token });
export const actionAuthLogout = () => ({ type: "LOGOUT" });


const actionPromiseRegister = (login, password) =>
    actionPromise(
        "register",
        gqlQuery(
            `mutation register($login:String!, $password:String!){
  createUser(
    login:$login,
    password:$password
  ){
    login _id
  }
}`,
            { login, password }
        )
    );

const actionPromiseLogin = (login, password) =>
    actionPromise(
        "login",
        gqlQuery(
            `query logins($login:String!,
  $password:String!){
  login(login:$login,password:$password)
}`,
            { login, password }
        )
    );

export const actionLogin = (login, password) => async (dispatch) => {
    const payload = await dispatch(actionPromiseLogin(login, password));
    dispatch(actionAuthLogin(payload));
};

export const actionRegister = (login, password) => async (dispatch) => {
    const result = await dispatch(actionPromiseRegister(login, password));
    if (result) {
        return await dispatch(actionLogin(login, password));
    }
};

