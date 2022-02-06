import React from 'react'
import { ChatIcon } from '@heroicons/react/outline'
import { signIn } from 'next-auth/react';

function NoPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4  ">
      <div>
        <ChatIcon className=" h-40 sm:h-40" />
      </div>
      <div className="text-6xl font-bold">Chat Bot</div>
      <div className="font-semibold text-grayish">
        Please Sign In to Continue
      </div>
      <button
        onClick={signIn}
        className="cursor-pointer rounded-xl bg-darkPurple px-4 py-3 font-semibold   text-white"
      > 
    Sign In With Google
      </button>
    </div>
  )
}

export default NoPage
