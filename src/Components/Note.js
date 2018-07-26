import React, { Component } from 'react';
import '../App.css'
import Draggable from 'react-draggable'

export class Note extends Component {
	state = {
		editing: false,
	}
	componentWillMount() {
                this.style = {
                    right: this.randomBetween(0, window.innerWidth - 150, 'px'),
                    top: this.randomBetween(0, window.innerHeight -150, 'px')
                }
    }
	// Toggle Ediiting mode for note
	handleEdit = () => {
		this.setState({
			editing:true,
		})
	}
	// Handle Save Note
	handleSave = () => {
		this.props.onChange(this.refs.newText.value , this.props.id)
		this.setState({
			editing:false
		})
	}
	handleRemove = () => {
		this.props.onRemove(this.props.id)
	}
	// Render Form To Input Note Function
	renderForm() {
		return (
			<div className="note" 
            	 style={this.style}>
            	<textarea ref="newText" defaultValue={this.props.children}></textarea>
            	<button onClick={this.handleSave}>SAVE</button>
            </div>
		);	
	}
	// Render display text 
	renderDisplay() {
		return (
			 <div className="note"
                  style={this.style}>
                <p>{this.props.children}</p>
                   <span>
                     <button onClick={this.handleEdit}>EDIT</button>
                     <button onClick={this.handleRemove}>X</button>
                   </span>
             </div>
		);
	}

	// render random
	randomBetween(x, y, s) {
                return (x + Math.ceil(Math.random() * (y-x))) + s
    }
	// Main render function
	render() {
		return (
			<Draggable>
				{this.state.editing ? this.renderForm() : this.renderDisplay()}
			</Draggable>
		);
	}
}
