import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { connect } from "react-redux";
import { actionUploadFiles } from "../actions/ActionUploadFiles";


function Drop ({onDrop}) {
   
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    )
  }

  export const CDrop = connect(null, {onDrop:actionUploadFiles})(Drop)

//   <form action="/upload" method="post" enctype="multipart/form-data" id='form'>
//   <input type="file" name="photo" id='photo'/>
// </form>