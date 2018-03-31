import React from 'react'
const Workout = ({workout}) =>
    <div className="tile" key={workout.id} >
        <h4>{workout.date}</h4>
        <p>{workout.activity}</p>
        <p>{workout.distance}</p>
        <p>{workout.duration}</p>
    </div>

export default Workout