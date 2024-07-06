'use client';

import { useState, useEffect } from "react"
import PromptCardList from "./PromptCardList"

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(()=>{
    (async ()=>{
      try{
        const response = await fetch('/api/prompt')
        const data = await response.json()

        setPosts(data)
      }catch(err){
        console.log(err)
      }
    })()
    
  }, [])

  useEffect(()=>{
    const filteredPostsArray = posts.filter(post => post.creator.username.toLowerCase().includes(searchQuery.toLowerCase()) || post.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredPosts(filteredPostsArray)
  }, [searchQuery])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or username" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
          data={searchQuery ? filteredPosts : posts}
          handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed