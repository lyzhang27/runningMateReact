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
                console.log(typeof response.data[1].user_id)
                var allWorkouts = response.data;
                var userWorkouts = [];
                for (var i = 0; i < allWorkouts.length; i++) {
                    if (allWorkouts[i].user_id == this.props.userId) {
                        userWorkouts.push(allWorkouts[i]);
                    }
                }
                this.setState({workouts: userWorkouts})
            })
            .catch(error => console.log(error))
    }

    addNewWorkout = (id) => {
        axios.post(
            'http://localhost:3001/api/v1/workouts',
            { workout:
                    {
                        date: Date(),
                        activity: 'run/interval/weights',
                        distance: 999,
                        duration: 999,
                        completed: false,
                        user_id: this.props.userId
                    }
            }
        )
            .then(response => {
                console.log(response.data)

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

    updateWorkout = (workout) => {
        const workoutIndex = this.state.workouts.findIndex(x => x.id === workout.id)
        const workouts = update(this.state.workouts, {[workoutIndex]: { $set: workout }})
        this.setState({workouts: workouts, notification: 'All changes saved', transitionIn: true})
    }

    enableEditing = (id) => {
        this.setState({editingWorkoutId: id}, () => { this.title.focus() })
    }

    deleteWorkout = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/api/v1/workouts/${id}`)
            .then(response => {
                const workoutIndex = this.state.workouts.findIndex(x => x.id === id)
                const workouts = update(this.state.workouts, { $splice: [[workoutIndex, 1]]})
                this.setState({workouts: workouts})
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                    <button className="newWorkoutButton" onClick={this.addNewWorkout} >
                        Add Workout
                    </button>
                <div>
                    {this.state.workouts.map((workout) => {
                        if(this.state.editingWorkoutId === workout.id) {
                            return(<WorkoutForm workout={workout} key={workout.id} updateWorkout={this.updateWorkout} titleRef= {input => this.title = input}/>)
                        } else {
                            return (<Workout workout={workout} key={workout.id} onClick={this.enableEditing} onDelete={this.deleteWorkout} />)
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default WorkoutsContainer