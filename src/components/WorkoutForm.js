import React, { Component } from 'react'
import axios from 'axios'

class WorkoutForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className="tile">
                <form>
                    <input className='input' type="text"
                           name="date" placeholder="Enter a date" />
                    <textarea className='input' name="body"
                              placeholder='What is the activity'></textarea>
                </form>
            </div>
        );
    }
}

export default WorkoutForm