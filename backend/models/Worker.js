import mongoose from 'mongoose';

const WorkerSchema = new mongoose.Schema(
    {
        fio: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: Date,
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
        phone_number: {
            type: String,
            required: true,
            unique: true,
        },
        post: {
            type: String,
            required: true,
        },
        inventory: {
            type: Array,
            default: [],
        },
    },
);

export default mongoose.model('Worker', WorkerSchema);