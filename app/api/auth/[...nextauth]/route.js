import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database"
import User from "@models/user"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session}){
            const sessionUser = await User.findOne({email: session.user.email})
            session.id = sessionUser._id.toString()

            return session
        },
        async signIn({profile}){
            try{
                await connectToDB()

                const userExist = await User.findOne({email: profile.email})
                console.log('###################: ', profile)
                if(!userExist){
                    await User.create({
                        username: profile.name.replace(' ', '').toLowerCase(),
                        email: profile.email,
                        image: profile.picture
                    })
                }

                return true
            }catch(err){
                console.log(err)
                return false
            }
        }
    }
})

export {handler as GET, handler as POST}