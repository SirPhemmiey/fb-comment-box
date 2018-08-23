import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

const Comment = props => (
    <div className="singleComment">
        <img src={`https://picsum.photos/70?random=${props.id}`}
        className="userImage"/>
        <div className="textContent">
            <div className="singleCommentContent">
                <h3>{props.author}</h3>
                <ReactMarkdown source={props.children}/>
            </div>
            <div className="singleCommentButtons">
                <span className="time">{moment(props.timestamp).fromNow()}</span>
                <a onClick={() => {props.handleUpdateComment(props.id)}}>Update</a>
                <a onClick={() => {props.handleDeleteComment(props.id)}}>Delete</a>
            </div>
        </div>
    </div>
);

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    handleDeleteComment: PropTypes.func.isRequired,
    handleUpdateComment: PropTypes.func.isRequired
};

export default Comment;