'use client';

import { useState, useEffect } from "react"
import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation";

const ProfilePage = () => {
  const {data: session} = useSession()
  const [posts, setPosts] = useState([])
  const searchParams = useSearchParams()
  const userProfileId = searchParams.get('user_id')
  const router = useRouter()
  const [isMyProfile, setIsMyProfile] = useState(false)

  useEffect(()=>{
    if(!session && !userProfileId){
      router.push('/')
      return
    }

    if((session && session?.id === userProfileId ) || (!userProfileId && session)){
      setIsMyProfile(true)
    }

    (async ()=>{
      try{
        const response = await fetch(`/api/users/${isMyProfile ? session.id : userProfileId}/posts`)
        const data = await response.json()
        console.log('data: ', data)
        setPosts(data)
      }catch(err){
        console.log(err)
      }

    })()
  }, [session, userProfileId])


  return (
    <Profile 
      title={ isMyProfile ? 'My Profile' : posts[0]?.creator?.username }
      desc={ `Welcome to ${ isMyProfile ? 'your' : posts[0]?.creator?.username } personalized profile page`}
      data={posts}
    />
  )
}

export default ProfilePage