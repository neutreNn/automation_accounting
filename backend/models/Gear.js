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
            unique: true,
        },
        date_of_issue: {
            type: String,
            required: true,
        },
        created_date: {
            type: String,
            required: true,
        },
        purchase_date: {
            type: String,
            required: true,
        },
        warranty_expiration: {
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
        history: {
            type: Array,
            required: true,
            default: [],
        },
        barcodeUrl: String,
    },
);

export default mongoose.model('Gear', GearSchema);