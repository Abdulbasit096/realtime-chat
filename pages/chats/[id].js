import { db } from '../../firebase'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  collection,
  orderBy,
  where,
  query,
  onSnapshot,
  doc,
} from 'firebase/firestore'
import ChatView from '../../components/ChatView'
import Header from '../../components/Header'

function Chat() {
  const router = useRouter()
  const chatID = router.query.id
  const [passIsCorrect, setPassIsCorrect] = useState(false)
  const [chat, setChat] = useState()
  const passRef = useRef(null)

  useEffect(() => {
    onSnapshot(doc(db, `chats/${chatID}`), (snapshot) => {
      setChat(snapshot.data())
    })
  }, [db, chatID])

  const checkPass = () => {
    if (passRef.current.value === chat.chatCode) {
      passRef.current.value = ''
      setPassIsCorrect(true)
    } else {
      alert('Wrong password')
      passRef.current.value = ''

      setPassIsCorrect(false)
    }
  }

  return (
    <div>
      {passIsCorrect ? (
        <ChatView chat={chat} chatId = {chatID} />
      ) : (
        <div className="flex h-screen flex-col items-center justify-center  ">
          <div className="flex flex-col items-center space-y-5 rounded-lg bg-gray-100 py-20 px-8 shadow-lg">
            <h1 className="text-4xl font-bold text-darkPurple">{chat?.name}</h1>
            <p className="font-semibold text-grayish">
              To access this Chat enter the password
            </p>
            <input
              ref={passRef}
              className="w-full flex-1 rounded-lg border-2 bg-gray-100 p-2 outline-none"
              type="text"
              placeholder="Password.."
            />
            <button
              className="w-full rounded-lg bg-greenish p-2 font-semibold text-white"
              onClick={checkPass}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat
