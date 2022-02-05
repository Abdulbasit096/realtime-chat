import React,{useState} from 'react';
import {ChatIcon} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';

function Header() {
const { data: session } = useSession();


  return <header className='flex items-center justify-between py-2 px-4 dark:bg-black dark:opacity-95'>
      <div className='flex items-center space-x-2 text-black dark:text-white'>
          <ChatIcon className="h-16"/>
          <h1 className='text-xl sm:text-3xl font-bold '>Chat Bot</h1>
      </div>
      <div className='flex items-center space-x-3 sm:space-x-5 text-black dark:text-white text-lg'>
          {session && <Link href='/'>
              <p>Chats</p>
          </Link>}
          {!session && <button onClick={signIn} className='bg-darkPurple cursor-pointer text-white font-semibold px-4 py-1 rounded-xl'>Sign In</button>}
         {session && <img title='Click to Sign Out' onClick={signOut} className='h-10 w-10 cursor-pointer rounded-full' src={session?.user?.image} alt="" />}
      </div>
  </header>;
}

export default Header;
