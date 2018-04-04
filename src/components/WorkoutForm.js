import React, { Component } from 'react'
import axios from 'axios'

class WorkoutForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: this.props.workout.date,
            activity: this.props.workout.activity,
            distance: this.props.workout.distance,
            duration: this.props.workout.duration
        }
    }

    render() {
        return (
            <div className="tile">
                <form onBlur={this.handleBlur}>
                    <label>Date: </label>
                    <input className='input' type="date" name="date" value={this.state.date}
                           onChange={this.handleInput} ref={this.props.titleRef}></input>
                    <label>Input: </label>
                    <input className='input' type="text" name="activity" placeholder='What is the activity'
                           value={this.state.activity} onChange={this.handleInput}></input>
                    <label>Distance(mi): </label>
                    <input className='input' type="number" name="distance" placeholder='What is the distance'
                           value={this.state.distance} onChange={this.handleInput}></input>
                    <label>Duration(min): </label>
                    <input className='input' type="number" name="duration" placeholder='What is the duration'
                           value={this.state.duration} onChange={this.handleInput}></input>
                </form>
            </div>
        );
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleBlur = () => {
        const workout = {
            date: this.state.date,
            activity: this.state.activity
        }

        axios.put(
            `http://localhost:3001/api/v1/workouts/${this.props.workout.id-1}`,
            {
                workout: workout
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
    }
}

export default WorkoutForm