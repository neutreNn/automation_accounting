import mongoose from 'mongoose';

const LogsSchema = new mongoose.Schema({
    time: {
        type: Date,
        default: Date.now,
        required: true,
    },
    typeAction: {
        type: String,
        required: true,
    },
    module: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Logs', LogsSchema);
