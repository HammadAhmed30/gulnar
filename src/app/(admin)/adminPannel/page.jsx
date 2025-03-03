"use client"
import React, { useEffect, useState } from 'react'
import AdminDash from '../_components/AdminDash';
import '../../(client)/globals.css';
import { useSnapshot } from 'valtio';
import { state } from '../../../../store/store';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const AdminPannel = () => {
  const {username, password, userStatus} = useSnapshot(state)
const [userna, setUsername ] = useState("")
const [passwo, setPass ] = useState("")
const [userStat, setStatus ] = useState("")
const [display, setDisplay] = useState(false)

useEffect(()=>{

  const UN = localStorage.getItem('username');
      const PASS = localStorage.getItem('password') ;
      const US = localStorage.getItem('userStatus') ;

      setUsername(UN)
      setPass(PASS)
      setStatus(US)

      if((userna===process.env.NEXT_PUBLIC_USERNAME&&passwo===process.env.NEXT_PUBLIC_PASSWORD && userStat === "true")||((username===process.env.NEXT_PUBLIC_USERNAME&&password===process.env.NEXT_PUBLIC_PASSWORD && userStatus === true))){
        setDisplay(true)
      }
      else{
        setDisplay(false)
        // redirect("/sign-in")
      }
    },[userna])
    
    
    return display === true ?<AdminDash/> : <div className='w-full h-[100vh] items-center flex justify-center'>
      <Link href={"/sign-in"} className='text-center underline'>Login as Admin</Link>
    </div>

}

export default AdminPannel