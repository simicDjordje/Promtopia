'use client';

import { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { DELETE } from "@app/api/prompt/[id]/route";

const PromptCard = ({post, handleTagClick}) => {
  const [copied, setCopied] = useState(false)
  const {data: session} = useSession()
  const router = useRouter()
  const [deleted, setDeleted] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(post.prompt)

    setTimeout(()=>{setCopied(false)}, 3000)
  }

  const handleEdit = () => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async () => {
   try{
    const response = await fetch(`/api/prompt/${post._id}`, {
      method: 'DELETE'
    })

    if(response.ok){
      setDeleted(true)
    }
   }catch(err){
    console.log(err)
   }
  }

  const handleUserProfile = () => {
    router.push(`/profile?user_id=${post.creator._id}`)
  }

  if(deleted) return null

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div onClick={handleUserProfile}
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          >
          <Image 
            src={post.creator.image} 
            alt="User Image" 
            width={40} 
            height={40} 
            className="rounded-full object-contain" 
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
              <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
            </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={copied ? 'assets/icons/tick.svg' : 'assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>  

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p 
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={()=>handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session && session.id === post.creator._id && (
        <div className="mt-4 flex-center gap-4 border-t border-gray-100 pt-3">
          <p 
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >Edit</p>
          
          <p 
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard