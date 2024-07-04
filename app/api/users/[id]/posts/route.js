import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (req, {params}) => {
    try{
        await connectToDB()
        const {id} = params
        const prompts = await Prompt.find({creator: id}).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
    }catch(err){
        console.log(err)
        return new Response('Failed to fetch all prompts', {status: 500})
    }
}