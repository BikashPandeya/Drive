const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    secure_url: { type: String, required: [true , "Secure URL is required"] },
    public_id: { type: String, required: [true , "Public ID is required"] },
    resource_type: { type: String, default: "auto" },
    originalName: {
        type: String,
        required: [true, "Original name is required"]
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "User is required"]
    }

})

const file = mongoose.model('files', fileSchema)

module.exports = file;