import mongoose from 'mongoose';

const GearSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        serial_number: {
            type: String,
            required: true,
        },
        inventory_number: {
            type: String,
            required: true,
            unique: true,
        },
        year_of_release: {
            type: String,
            required: true,
        },
        year_of_input: {
            type: String,
            required: true,
        },
        year_of_output: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        supplier: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        history: {
            type: Array,
            default: [],
        },
    },
);

export default mongoose.model('Gear', GearSchema);