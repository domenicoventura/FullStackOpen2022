import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </>
  )
}

const Total = ({parts}) => {
  const sum = parts.reduce((result, item) => {
    console.log('what is happening', result, item)
    return result + item.exercises;
  }, 0);

  return (
    <>
      <p><b>Total of {sum} exercises</b></p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course