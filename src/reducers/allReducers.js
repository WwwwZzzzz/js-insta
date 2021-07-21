import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const authReducer = (state, { type, token }) => {
  if (state === undefined) {
    if (localStorage.getItem("token") !== null) {
      type = "LOGIN"
      token = localStorage.token
    }
    else {
      return {};
    }
  }
  if (type === "LOGIN") {
    localStorage.token = token;
    let middleToken = token.split(".")[1];
    let cleanToken = atob(middleToken);
    let tokenJson = JSON.parse(cleanToken);
    localStorage.myUserId = tokenJson.sub.id;
    return { token, data: { tokenJson } };
  }
  if (type === "LOGOUT") {
    localStorage.removeItem("token");
    return {};
  }
  return state;
};

const reducers = {
  promise: (state = {}, { type, name, status, payload, error }) => {
    const actions = {
      PROMISE() {
        return { ...state, [name]: { status, payload, error } };
      },
    };

    if (type in actions) return actions[type]();
    return state;
  },
  auth: authReducer,
};


const actionPending = (name) => ({ type: "PROMISE", name, status: "PENDING" });
const actionResolved = (name, payload) => ({ type: "PROMISE", name, status: "RESOLVED", payload });
const actionRejected = (name, error) => ({ type: "PROMISE", name, status: "REJECTED", error });

export const actionPromise = (name, promise) => async (dispatch) => {
    dispatch(actionPending(name));
    try {
        const payload = await promise;
        dispatch(actionResolved(name, payload));
        return payload;
    } catch (error) {
        dispatch(actionRejected(name, error));
    }
};

export const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));
console.log(store.getState());


