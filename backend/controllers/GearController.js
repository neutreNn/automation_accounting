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
                inventory_number: req.body.inventory_number,
                year_of_release: req.body.year_of_release,
                year_of_input: req.body.year_of_input,
                year_of_output: req.body.year_of_output,
                price: req.body.price,
                supplier: req.body.supplier,
                history: req.body.history,
                available: req.body.available,
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
            inventory_number: req.body.inventory_number,
            year_of_release: req.body.year_of_release,
            year_of_input: req.body.year_of_input,
            year_of_output: req.body.year_of_output,
            price: req.body.price,
            supplier: req.body.supplier,
            location: req.body.location,
            available: req.body.available,
            history: req.body.history,
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