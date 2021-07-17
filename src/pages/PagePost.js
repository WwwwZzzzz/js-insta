import React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { actionPostById, actionCreatePost } from '../actions/ActionPost';
import { actionPromise, store } from "../reducers/allReducers";
import { useParams } from "react-router";

const DrawPost = ({ _id, title, text, createdAt, images, url }) => {
  return (
    <>
      <p>{_id}</p>
      <p>{createdAt}</p>
      <h1>{title}</h1>
      <img src={url} />
    </>
  );
};

const CDrawPost = connect((state) => state.promise.postById?.payload)(DrawPost);

export const Post = ({ match: { params: { _id }, }, getData,
}) => {
  useEffect(() => {
    getData(_id);
  }, [_id]);
  let result = getData(_id);
  // store.dispatch(actionPostById(_id));
  // console.log(store.getState());
  // let post = store.getState().promise?.postById.payload;
  return (
    <>
      <CDrawPost />
    </>
  );
};


export const CPost = connect(null, { getData: actionPostById })(Post)

