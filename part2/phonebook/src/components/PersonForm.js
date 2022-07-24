import React from 'react'

const PersonForm = (props) => {
  // console.log('props is', props)
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name:
        <input
          value={props.name.value}
          onChange={props.name.onChange}
        />
      </div>
      <div>
        number:
        <input
          value={props.number.value}
          onChange={props.number.onChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm