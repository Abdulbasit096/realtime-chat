import Head from 'next/head'
import Chats from '../components/Chats'
import Header from '../components/Header'
import {useSession} from 'next-auth/react'
import NoPage from '../components/NoPage'

export default function Home() {
  const {data: session} = useSession()
  return (
    <div className='font-body'>
      <Header/>

      {session ? <Chats/> :<NoPage/>}
    </div>
  )
}


