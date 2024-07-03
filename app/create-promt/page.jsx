'use client';

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@components/Form";

const CreatePromt = () => {
    const [submiting, setSubmiting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const createPromt = async (e) => {

    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submiting={submiting}
            handleSubmit={createPromt}
        />
    )
  }
  
  export default CreatePromt