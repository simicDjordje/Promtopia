'use client';

import { useState, useEffect } from "react"
import Profile from "@components/Profile"
import { useSession } from "next-auth/react"

const ProfilePage = () => {
  const {data: session} = useSession()
  const [posts, setPosts] = useState([])

  const handleEdit = async () => {

  }

  const handleDelete = async () => {

  }

  useEffect(()=>{
    
    // if(!session?.id) return
    (async ()=>{
      const response = await fetch(`/api/users/${session?.id}/posts`)
      const data = await response.json()

      setPosts(data)
    })()
  }, [session])

  return (
    <Profile 
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage