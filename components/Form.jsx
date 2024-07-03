
const Form = ({
  type,
  post,
  setPost,
  submiting,
  handleSubmit
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing promts with the world, and let your imagination run wild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label className="font-satoshi font-semibold text-base text-gray-700">Your AI Promt</label>
        <textarea
          value={post.promt}
          onChange={(e) => setPost({...post, promt: e.target.value})}
          placeholder="Write your promt here"
          required
          className="form_textarea"
        />

        <label className="font-satoshi font-semibold text-base text-gray-700">
          Tag
          <span className="font-normal"> (#product, #webdevelopment, #idea)</span>
        </label>
        <input
          value={post.promt}
          onChange={(e) => setPost({...post, tag: e.target.value})}
          placeholder="#tag"
          required
          className="form_input"
        />
      </form>
    </section>
  )
}

export default Form