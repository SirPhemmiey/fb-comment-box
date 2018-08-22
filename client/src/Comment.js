import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Comment = props => (
    <div className="singleComment">
        <img src={`https://picsum.photos/70?random=${props.id}`} alt="image"
        className="userImage"/>
        <div className="textContent">
            <div className="singleCommentContent">
                <h3>{props.author}</h3>
                <ReactMarkdown source={props.children}/>
            </div>
            <div className="sinngleCommentButtons"></div>
        </div>
    </div>
);

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
};

export default Comment;