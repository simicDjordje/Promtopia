import PromptCardList from "./PromptCardList"
import PromptCard from "./PromtpCard"

const Profile = ({title, desc, data}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient">{title}</h1>
      <p className="desc text-left">{desc}</p>
      <PromptCardList 
        data={data}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Profile