'use client';

import { useEffect, useState, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form";

const UpdatePrompt = () => {
    const [submiting, setSubmiting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const {data: session} = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    useEffect(()=>{
        if(!promptId) return

        (async () => {
            try{
                const response = await fetch(`api/prompt/${promptId}`)
                const data = await response.json()

                setPost({...data})
            }catch(err){
                console.log(err)
            }
        })()
    }, [promptId])

    const updatePrompt = async (e) => {
        if(!promptId) return
        e.preventDefault()
        setSubmiting(true)
        
        try{
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...post
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
            type="Edit"
            post={post}
            setPost={setPost}
            submiting={submiting}
            handleSubmit={updatePrompt}
        />
    )
  }
  

  const UpdatePromptSuspense = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <UpdatePrompt />
    </Suspense>
  )

  export default UpdatePromptSuspense



  