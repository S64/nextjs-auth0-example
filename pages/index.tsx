import React from 'react'
import { NextPageContext } from "next";
import Link from 'next/link'
import { useUser } from "../user";

export default function Index({}: NextPageContext) {
  const { user } = useUser()

  return <>
    {user ? <>
      <div>has user.</div>
    </> : <>
      <div>has not user.</div>
      <a href="/api/auth0/signin">Signin</a>
    </>}
    <div>
      <Link href="/account">Account detail</Link>
    </div>
  </>
}
