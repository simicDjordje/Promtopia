import { Schema, model, models } from "mongoose"
console.log('models: ', models)
const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: 'String',
        required: [true, 'Prompt is required.']
    },
    tag: {
        type: 'String',
        required: [true, 'Tag is required.']
    }
})

const Prompt = models && models.Prompt || model('Prompt', PromptSchema)

export default Prompt