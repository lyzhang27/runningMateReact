import React, { Component } from 'react'
import axios from 'axios'
import Workout from './Workout'
import WorkoutForm from './WorkoutForm'
import update from 'immutability-helper'


class WorkoutsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            workouts: [],
            editingWorkoutId: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/workouts.json')
            .then(response => {
                console.log(response)
                this.setState({workouts: response.data})
            })
            .catch(error => console.log(error))
    }

    addNewIdea = () => {
        axios.post(
            'http://localhost:3001/api/v1/workouts',
            { workout:
                    {
                        date: Date(),
                        activity: 'run',
                        distance: 1,
                        duration: 2
                    }
            }
        )
            .then(response => {
                console.log(response)
                const workouts = update(this.state.workouts, {
                    $splice: [[0, 0, response.data]]
                })
                this.setState({
                    workouts: workouts,
                    editingWorkoutId: response.data.id
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <button className="newIdeaButton" onClick={this.addNewIdea} >
                    New Idea
                </button>
                <div>
                    {this.state.workouts.map((workout) => {
                        if(this.state.editingWorkoutId === workout.id) {
                            return(<WorkoutForm workout={workout} key={workout.id} />)
                        } else {
                            return (<Workout workout={workout} key={workout.id} />)
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default WorkoutsContainer