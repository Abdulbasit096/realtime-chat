import React from 'react'
import Moment from 'react-moment'

function SingleChat({ img, current, message }) {
  console.log(current)
  return (
    <div
      className={`flex items-center space-x-2  ${
        current ? 'flex-row-reverse text-white' : 'flex-row'
      }`}
    >
      <img
        className={`h-10 w-10 rounded-full ${current ? 'ml-2' : 'mr-2'}`}
        src={img}
        alt=""
      />

      <div
        className={`flex w-fit text-2xl items-center rounded-md ${
          current ? 'bg-slate-700' : 'bg-slate-300'
        } px-3 py-1`}
      >
        <p className="w-3/5 flex-1">{message}</p>

        {/* <Moment fromNow className="text-xs font-medium text-grayish">
          {timestamp}
        </Moment> */}
      </div>
    </div>
  )
}

export default SingleChat
