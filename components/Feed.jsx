'use client';

import { useState, useEffect } from "react"
import PromptCardList from "./PromptCardList"

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {

  }

  useEffect(()=>{
    (async ()=>{
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    })()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or username" 
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
          data={posts}
          handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed