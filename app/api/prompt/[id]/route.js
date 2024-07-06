import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, {params}) => {
    try{
        const {id} = params
        await connectToDB()

        const foundPrompt = await Prompt.findById(id).populate('creator')

        if(!foundPrompt) return new Response('Prompt not found', {status: 404})
        
        return new Response(JSON.stringify(foundPrompt), {status: 200})

    }catch(err){
        console.log(err)
        return new Response('Failed to get prompt', {status: 500})
    }
}


export const PATCH = async (req, {params}) => {
    try{
        const {id} = params
        const {prompt, tag} = await req.json()

        await connectToDB()

        const foundPrompt = await Prompt.findById(id)

        if(!foundPrompt) return new Response('Prompt not found', {status: 404})

        if(prompt) foundPrompt.prompt = prompt
        if(tag) foundPrompt.tag = tag

        await foundPrompt.save()

        return new Response(JSON.stringify(foundPrompt), {status: 200})
    }catch(err){
        console.log(err)
        return new Response('Failed to edit prompt', {status: 500})
    }
}



export const DELETE = async (req, {params}) => {
    try{
        const {id} = params
        await connectToDB()

        await Prompt.findByIdAndDelete(id)

        return new Response('Prompt deleted succesfully', {status: 200})
    }catch(err){
        console.log(err)
        return new Response('Failed to edit prompt', {status: 500})
    }
}