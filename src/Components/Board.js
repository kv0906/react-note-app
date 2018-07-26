import React, { Component } from 'react';
import '../App.css'
import { Note } from './Note'

export class Board extends Component {
    state = {
        notes: []
    }
    nextId = () => {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }
    // Add note function
    add = (text) => {
        var notes = [
            ...this.state.notes,
            {
                id: this.nextId(),
                note: text
            }
        ]
        this.setState({ notes })
    }
    //Remove Note 
    remove = (id) => {
        var notes = this.state.notes.filter(note => note.id !== id)
        this.setState({ notes })
    }
    eachNote = (note) => {
        return (
            <Note key={note.id}
                id={note.id}
                onChange={this.update}
                onRemove={this.remove}>
                {
                    note.note
                }
            </Note>
        )
    }
    //Update Note
    update = (newText, id) => {
        var notes = this.state.notes.map(note => (note.id !== id) ? note :
            {
                ...note,
                note: newText
            }
        )
        this.setState({ notes })
    }
    render() {
        return (
            <div className='board'>
                <h1 className="title">My Note App</h1>
                {this.state.notes.map(this.eachNote)}
                <button onClick={() => this.add('New Note')}>+</button>
            </div>
        );
    }
}
// Specify PropTypes in React
Board.propTypes = {
    count: function (props, propName) {
        if (typeof props[propName] !== "number") {
            return new Error("the count must be a number")
        }

        if (props[propName] > 100) {
            return new Error('Creating ' + props[propName] + ' notes is ridiculous')
        }
    }
}