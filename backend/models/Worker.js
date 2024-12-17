import mongoose from 'mongoose';

const WorkerSchema = new mongoose.Schema(
    {
        fio: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: String,
            required: true,
        },
        employee_number: {
            type: String,
            required: true,
            unique: true,
        },
        passport: {
            type: String,
            required: true,
            unique: true,
        },
        inn_number: {
            type: String,
            required: true,
            unique: true,
        },
        post: {
            type: String,
            required: true,
        },
        history: {
            type: Array,
            default: [],
        },
    },
);

export default mongoose.model('Worker', WorkerSchema);