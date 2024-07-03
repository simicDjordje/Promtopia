'use client';

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@components/Form";

const CreatePrompt = () => {
    const [submiting, setSubmiting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const {data: session} = useSession()
    const router = useRouter()

    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmiting(true)
        
        try{
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    ...post,
                    userId: session?.id
                })
            })

            if(response.ok) router.push('/')
        }catch(err){
            console.log(err)
        }finally{
            setSubmiting(false)
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submiting={submiting}
            handleSubmit={createPrompt}
        />
    )
  }
  
  export default CreatePrompt