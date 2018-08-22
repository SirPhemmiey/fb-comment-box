import React, { Component } from 'react';
import 'whatwg-fetch';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from './data';
import './CommentBox.css'

class CommentBox extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            error: '',
            author: '',
            text: ''
        };
        this.pollInterval = null;
    }

    loadComments = () => {
        fetch('/api/comments')
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                this.setState({ error: res.error });
            }
            else {
                this.setState({ data: res.data });
            }
        })
    }

    componentDidMount() {
        this.loadComments();
        if (!this.pollInterval) {
            setInterval(this.loadComments, 2000);
        }
    }
    componentWillUnmount() {
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
        }
        this.pollInterval = null;
    }

    render() {
        return (
            <div className="container">
                <div className="comments">
                    <h2>Comments: </h2>
                    <CommentList data={this.state.data} />
                </div>
                <div className="form">
                    <CommentForm  author={this.state.author} text={this.state.text}/>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

export default CommentBox;