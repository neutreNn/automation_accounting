import GearModel from '../models/Gear.js'

export const getAll = async (req, res) => {
    try {
        const gears = await GearModel.find();

        res.json(gears);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить инвентарь',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const gearId = req.params.id;

        const doc = await GearModel.findOne({ _id: gearId });

        if (!doc) {
            return res.status(404).json({
                message: 'Инвентарь не найден',
            });
        }
        
        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось вернуть инвентарь',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const gearId = req.params.id;

        const doc = await GearModel.findOneAndDelete({ _id: gearId });

        if (!doc) {
            return res.status(404).json({
                message: 'Инвентарь не найден',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить инвентарь',
        });
    }
};

export const update = async (req, res) => {
    try {
        const gearId = req.params.id;
        
        await GearModel.updateOne(
            {
                _id: gearId,
            },
            {
                name: req.body.name,
                category: req.body.category,
                serial_number: req.body.serial_number,
                date_of_issue: req.body.date_of_issue,
                assigned_to: req.assigned_to,
                created_date: req.body.created_date,
                purchase_date: req.body.purchase_date,
                warranty_expiration: req.body.warranty_expiration,
                price: req.body.price,
                supplier: req.body.supplier,
                history: req.body.history,
                barcodeUrl: req.body.barcodeUrl,
            },
        );

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить инвентарь',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new GearModel({
            name: req.body.name,
            category: req.body.category,
            serial_number: req.body.serial_number,
            date_of_issue: req.body.date_of_issue,
            created_date: req.body.created_date,
            purchase_date: req.body.purchase_date,
            warranty_expiration: req.body.warranty_expiration,
            price: req.body.price,
            supplier: req.body.supplier,
            history: req.body.history,
            barcodeUrl: req.body.barcodeUrl,
        });

        const gear = await doc.save();

        res.json(gear);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать инвентарь',
        });
    }
}