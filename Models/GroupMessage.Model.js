import mongoose from 'mongoose';
const groupmsgSchema = new mongoose.Schema({
    message: {
        type: Object
    },
    sender_id: {
        type: Object,
        required: true
    },
    group_id: {
        type: Object,
        required: true
    },
    file_upload: {
        type:Object
    },
    unread: {
        type:Object,
        default: 0
    }
},{
    timestamps: {
    }
})

export const groupMsg = mongoose.model('group_message', groupmsgSchema);
