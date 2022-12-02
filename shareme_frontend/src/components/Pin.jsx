import React from 'react'
import { urlFor } from '../client'

const Pin = ({pin }) => {
  const {image,postedBy,_id,destination} = pin ;
   console.log(pin)
  return (
    <div>
       {image && (
        <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" /> )}
    </div>
  )
}

export default Pin