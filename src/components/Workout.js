import React, { Component } from 'react'

class Workout extends Component {
    constructor(props){
        super(props);
    }

    handleClick = () => {
        this.props.onClick(this.props.workout.id)
    }

    handleDelete = () => {
        this.props.onDelete(this.props.workout.id)
    }

    render() {
        return (
        <div className="tile" key={this.props.workout.id}>
            <span className="deleteButton" onClick={this.handleDelete}>x</span>
            <h4 onClick={this.handleClick}>{this.props.workout.date}</h4>
            <p onClick={this.handleClick}>Type: {this.props.workout.activity}</p>
            <p onClick={this.handleClick}>Distance: {this.props.workout.distance}</p>
            <p onClick={this.handleClick}>Duration: {this.props.workout.duration}</p>
            <p onClick={this.handleClick}>{this.props.workout.complete}</p>
        </div>
        )
    }
}

export default Workout