import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actionPostById, actionCreatePost } from '../actions/ActionPost';
// import { CDrawPost } from '../pages/PagePost';

const PostInput = (onCreatePost) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    return (
        <>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            <button onClick={() => onCreatePost(name, description)}>Click Post</button>
        </>
    )
}

const CPostInput = connect(null, { onCreatePost: actionCreatePost })(PostInput)

const PagePost = ({
    match: {
        params: { _id },
    },
    getData,
}) => {
    useEffect(() => {
        getData(_id);
    }, [_id]);
    console.log(`id must be here ${_id}`);
    return (
        <>
            <h1>{_id}</h1>
            {/* <CDrawPost /> */}
        </>
    );
};

export default connect(null, { getData: actionPostById })(PagePost);