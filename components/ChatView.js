import { TrashIcon } from '@heroicons/react/outline'
import { PaperAirplaneIcon } from '@heroicons/react/outline'
import Moment from 'react-moment'
import { PlusCircleIcon } from '@heroicons/react/outline'

import { db } from '../firebase'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  collection,
  orderBy,
  where,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore'
import SingleChat from './SingleChat'

function ChatView({ chat, chatId }) {
  console.log(chat)
  const [messages, setMessages] = useState([])
  const message = useRef(null)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (chat) {
      onSnapshot(
        query(
          collection(db, 'chats', chatId, 'messages'),
          orderBy('timestamp', 'asc')
        ),
        (snapshot) => {
          setMessages(snapshot.docs)
        }
      )
    }
  }, [chat])

  const sendMessage = async () => {
    if (session && message) {
      const msg = message.current.value
      message.current.value = ''
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        message: msg,
        by: session.user.uid,
        byImage: session.user.image,
        timestamp: serverTimestamp(),
      })
    }
  }

  const deleteChat = async () => {
    await deleteDoc(doc(db, `chats/${chatId}`)).then(() => {
      router.replace('/')
    })
  }

  const invitePeople = async () => {
    const input = prompt(
      'Enter emails to invite separated by commas if inviting multiple people'
    )
    const emails = input.split(',')

    await updateDoc(doc(db, `chats/${chatId}`), {
      invited: emails,
    })
  }

  const handleKeyPress = (event) => {
    // Check if the key is Enter
    if (event.key === 'Enter') {
      // Trigger the click event on the button element
      sendMessage()
    }
  }

  return (
    <div
      onKeyPress={handleKeyPress}
      className="relative flex h-screen w-full flex-col items-start justify-start bg-gray-300 p-10 scrollbar-hide"
    >
      <div className="flex w-full items-center justify-between space-x-3 border-b border-grayish  p-2">
        <div>
          <img
            className=" h-16 w-16 rounded-full"
            src={chat?.image}
            alt="Chat image"
          />
        </div>
        <div className="flex-grow text-4xl font-bold">{chat?.name}</div>
        <div className="flex items-center space-x-4">
          <PlusCircleIcon
            onClick={invitePeople}
            className="h-8 cursor-pointer"
          />
          <TrashIcon onClick={deleteChat} className="h-8 cursor-pointer" />
        </div>
      </div>
      <div className="w-full flex-1 space-y-8 overflow-scroll p-4 scrollbar-hide  ">
        {messages.map((message) => (
          <SingleChat
            img={message.data().byImage}
            message={message.data().message}
            // timestamp={message.data().timestamp}
            current={message.data().by === session?.user.uid}
          />
        ))}
      </div>
      <div className="absolute bottom-3 z-10  flex w-[90%]  items-center justify-between space-x-2 self-center rounded-lg bg-gray-400 px-2 text-2xl text-black shadow-lg">
        <input
          ref={message}
          className="flex-1 border-none bg-transparent p-3 outline-none"
          type="text"
        />
        <button
          onClick={sendMessage}
          className="m-2 rounded-full bg-gray-300 p-2 text-center"
        >
          <PaperAirplaneIcon className="h-8 rotate-[90deg] cursor-pointer text-black " />
        </button>
      </div>
    </div>
  )
}

export default ChatView
