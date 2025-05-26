import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
const content = () => {

  return (
    <div>
        {[...new Set(data.map(i=>i.course))].map((course, index) => (
        <button>{course}</button>
      ))}
    </div>
  )
}

export default content