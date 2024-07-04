'use client';

import PromptCard from "./PromtpCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
        {data.map((post, index) => (
            <PromptCard 
                post={post}
                key={post._id}
                handleTagClick={handleTagClick}
            />
        )
        )}
    </div>
  )
}

export default PromptCardList