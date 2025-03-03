"use client";

import React, { useState } from "react";
import "../../(client)/globals.css";
import Link from "next/link";
import { state } from "../../../../store/store";
import { redirect, useRouter } from "next/navigation";
import { useSnapshot } from "valtio";

const AdminForm = () => {
  const { username, password, userStatus } = useSnapshot(state);

  const [usernam, setUsername] = useState("");
  const [passwor, setPassword] = useState("");

  const [msg, setMsg] = useState(null);

  // if(username===process.env.NEXT_PUBLIC_USERNAME&&password===process.env.NEXT_PUBLIC_PASSWORD && userStatus == true){

  //   redirect("/adminPannel")
  // }

  const router = useRouter()


  function loginFunctionality() {
    if (usernam !== "" && passwor !== "") {
      console.log(process.env.NEXT_PUBLIC_USERNAME,"asdasd")
      if (
        usernam === process.env.NEXT_PUBLIC_USERNAME &&
        passwor === process.env.NEXT_PUBLIC_PASSWORD
      ) {
        setMsg(null);
        localStorage.setItem("username", usernam);
        localStorage.setItem("password", passwor);
        localStorage.setItem("userStatus", true);
        state.username=usernam
        state.password = passwor
        state.userStatus=true
        // router.push("/adminPannel")
        router.push("/adminPannel");
      } else {
        setMsg("Enter correct username and password");
      }
    } else {
      setMsg("Please fill all the feilds");
    }
  }

  return (
    <div className="bg-gray-50 font-[sans-serif]  cursor-pointer">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow-xl border-2">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign In
            </h2>
            <p className="text-gray-500 text-sm mt-10 leading-relaxed">
              Sign in to your Admin Pannel .
            </p>
            <form className="mt-5 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  UserName
                </label>
                <div className="relative flex items-center">
                  <input
                    value={usernam}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    value={passwor}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {/* <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-black  border-gray-300 rounded" />
                  <label  className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="#" className="text-black hover:underline font-semibold">
                    Forgot your password?
                  </Link>
                </div>
              </div> */}

              {msg && (
                <p className="text-[#F60000] font-bold text-[10px] mt-[10px] sm:text-[10px] flex items-center gap-[20px] dark:text-white">
                  {msg}
                </p>
              )}

              <div>
                <button
                  type="button"
                  onClick={() => {
                    loginFunctionality();
                  }}
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-black hover:bg-slate-900 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;

// import { SignIn } from '@clerk/nextjs'
// import React from 'react'

// export default function Page() {
//   return (
//     <div className='w-full h-full flex justify-center items-center'>

//     <SignIn/>
//     </div>
//   )
// }
