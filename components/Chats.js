import React, { useState, useEffect } from 'react'
import { PlusCircleIcon } from '@heroicons/react/outline'
import Modal from './Modal'
import ChatCard from './ChatCard'
import { db } from './../firebase'
import {
  collection,
  orderBy,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'

function Chats() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const [chats, setChats] = useState([])

  useEffect(() => {
    const chatsQueryOne = onSnapshot(
      query(
        collection(db, 'chats'),
        where('createdBy', '==', session.user.uid)
      ),

      (snapshotOne) => {
        setChats(snapshotOne.docs)
      }
    )
  }, [(db, session)])
  
  useEffect(() => {
    const chatsQueryTwo = onSnapshot(
      query(
        collection(db, 'chats'),
        where('invited', 'array-contains', session.user.email)
      ),

      (snapshotTwo) => {
        setChats((chats) => [...chats, ...snapshotTwo.docs])
      }
    )
  }, [(db, session)])


  return (
    <div className="h-screen  overflow-scroll rounded-2xl bg-background p-10 scrollbar-hide sm:m-8 sm:mx-auto sm:max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-greenish sm:text-4xl">
          {' '}
          Your Chats
        </h1>
        <PlusCircleIcon
          onClick={() => setOpen(true)}
          className="h-10 w-10 cursor-pointer rounded-full bg-grayish py-1 text-darkPurple transition-transform duration-200  hover:scale-125 hover:bg-greenish hover:bg-opacity-80 hover:text-white "
        />
      </div>
      <div className="overflow-scroll scrollbar-hide">
        {chats.length > 0 &&
          chats.map((chat) => (
            <ChatCard
              key={chat.id}
              id={chat.id}
              image={chat.data().image}
              name={chat.data().name}
              lastMessage={chat.data().lastMessage}
            />
          ))}
      </div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  )
}

export default Chats
