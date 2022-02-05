import React from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import Link from 'next/link'

function ChatCard({ id, image, name, lastMessage }) {

  return (
    <Link href={`/chats/${id}`}>
      <div className="mt-8 flex cursor-pointer items-center justify-between rounded-xl bg-gray-300 px-3 py-4 transition duration-500 ease-in-out hover:bg-darkPurple hover:text-white">
        <div className="flex flex-col items-start">
          <img className="h-10 w-10 rounded-full" src={image} alt="" />
        </div>
        <div className="ml-2 flex flex-1 flex-col items-start">
          <p className="text-lg font-bold">{name}</p>
          <div className="flex w-full items-center space-x-4">
            <p className="truncate">{lastMessage}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ChatCard
