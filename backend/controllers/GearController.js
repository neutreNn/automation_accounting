import GearModel from '../models/Gear.js'
import { logAction } from './LogsController.js';

export const getAll = async (req, res) => {

    const filters = { ...req.query };

    if (filters.price) {
        const [minPrice, maxPrice] = filters.price.split(',').map(Number);
        filters.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (filters.year_of_release) {
        const [minYear, maxYear] = filters.year_of_release.split(',').map(Number);
        filters.year_of_release = { $gte: minYear, $lte: maxYear };
    }
    if (filters.year_of_input) {
        const [minYear, maxYear] = filters.year_of_input.split(',').map(Number);
        filters.year_of_input = { $gte: minYear, $lte: maxYear };
    }
    if (filters.year_of_output) {
        const [minYear, maxYear] = filters.year_of_output.split(',').map(Number);
        filters.year_of_output = { $gte: minYear, $lte: maxYear };
    }

    try {
        const gears = await GearModel.find(filters);

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

        await logAction({
            typeAction: 'Удаление',
            module: 'Инвентарь',
            action: `Удалил инвентарь ${req.params.id}`,
            user: req.userName,
        });

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

        await logAction({
            typeAction: 'Обновление',
            module: 'Инвентарь',
            action: `Обновил инвентарь ${req.params.id}`,
            user: req.userName,
        });
        
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
                trashCan: req.body.trashCan,
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

        await logAction({
            typeAction: 'Добавление',
            module: 'Инвентарь',
            action: `Добавил новый инвентарь "${req.body.name}" с инвентарным номером ${req.body.inventory_number}`,
            user: req.userName,
        });

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