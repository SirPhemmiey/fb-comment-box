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
            text: '',
            updateId: ''
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

    onUpdateComment = id => {
        const oldComment = this.state.data.find(c => c.id === id);
        if (!oldComment) return null;
        this.setState({
            author: oldComment.author,
            text: oldComment.text,
            updateId: id
        })
    }
    onDeleteComment = id => {
        const i = this.state.data.findIndex(c => c.id === id);
        const data = [
            ...this.state.data.splice(0, i),
            ...this.state.data.splice(i + 1)
        ];
        this.setState({ data });
        fetch(`/api/comments/:${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            if (!res.success)
            this.setState({ error: res.error });
        })
    }

    onChangeText = e => {
        const newState = {...this.state};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    submitNewComment = (e) => {
        e.preventDefault();
        const { author, text } = this.state;
        const data = [
            ...this.state.data,
            {
                author,
                text,
                _id: Date.now().toString(),
                createdAt: new Date(),
                createdAt: new Date()
            }
        ];
        fetch('api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, text })
        })
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                this.setState({ error: res.error});
            }
            else {
                this.setState({ author: '', text: '', error: null});
            }
        })
    }

    submitUpdatedComment = () => {
        const {author, text, updateId } = this.state;
        fetch(`/api/comments/:${updateId}`, {
            method: 'PUT',
            body: JSON.stringify({ author, text })
        })
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                this.setState({ error: res.error });
            } else {
                this.setState({ author: '', text: '', updateId: null});
            }
        })
    }

    submitNewComment = (e) => {
        e.preventDefault();
        const { author, text, updateId } = this.state;
        if (updateId) {
            this.submitUpdatedComment();
        }
        else {
            this.submitNewComment();
        }
    }

    render() {
        return (
            <div className="container">
                <div className="comments">
                    <h2>Comments: </h2>
                    <CommentList data={this.state.data} />
                </div>
                <div className="form">
                    <CommentForm  author={this.state.author} text={this.state.text}
                    handleChangeText={this.onChangeText}
                    submitComment={this.submitComment}/>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

export default CommentBox;