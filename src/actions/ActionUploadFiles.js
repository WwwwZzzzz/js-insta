import React, {useCallback} from 'react';
import { actionPromise } from "../reducers/allReducers";

export const actionUploadFiles = (files) => async (dispatch) => {
    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      let promise = fetch('/upload', {
        method: 'POST',
        headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
        body: formData,
      }).then((response) => response.json());
      return promise;
    });
    return await dispatch(actionPromise('upload', Promise.all(promises)));
  };


//  export const actionUploadFiles = (files) =>
//     async (dispatch) => {
//         const promises = files.map((file) => {
//             const filesData = new FormData
//             fileData.append("file", file)
//             let promise = url.innerHTML = url.href = "/" + await(await fetch('/upload', {
//                 method: "POST",
//                 headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
//                 body: filesData
//             }))
//                 .then(response.json())
//             return promise
//         })

//         return await dispatch(actionPromise("uploads", Promise.all(promises)))
//     }