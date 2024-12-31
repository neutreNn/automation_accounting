import WorkerModel from '../models/Worker.js'

export const getAll = async (req, res) => {

    const filters = { ...req.query };

    if (filters.date_of_birth) {
        const [minYear, maxYear] = filters.date_of_birth.split(',').map(Number);
        const startDate = new Date(minYear, 0, 1);
        const endDate = new Date(maxYear, 11, 31, 23, 59, 59, 999);
    
        filters.date_of_birth = {
            $gte: startDate,
            $lte: endDate,
        };
    }

    try {
        const workers = await WorkerModel.find(filters);

        res.json(workers);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить работника',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const employeeNumber = req.params.employee_number;

        const doc = await WorkerModel.findOne({ employee_number: employeeNumber });

        if (!doc) {
            return res.status(404).json({
                message: 'Работник не найден',
            });
        }
        
        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось вернуть работника',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const employeeNumber = req.params.employee_number;

        const doc = await WorkerModel.findOneAndDelete({ employee_number: employeeNumber });

        if (!doc) {
            return res.status(404).json({
                message: 'Работник не найден',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить работника',
        });
    }
};

export const update = async (req, res) => {
    try {
        const employeeNumber = req.params.employee_number;
        
        await WorkerModel.updateOne(
            {
                employee_number: employeeNumber,
            },
            {
                fio: req.body.fio,
                date_of_birth: req.body.date_of_birth,
                employee_number: req.body.employee_number,
                passport: req.body.passport,
                inn_number: req.body.inn_number,
                post: req.body.post,
                phone_number: req.body.phone_number,
                inventory: req.body.inventory,
            },
        );

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить работника',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new WorkerModel({
            fio: req.body.fio,
            date_of_birth: req.body.date_of_birth,
            employee_number: req.body.employee_number,
            passport: req.body.passport,
            inn_number: req.body.inn_number,
            post: req.body.post,
            phone_number: req.body.phone_number,
            inventory: req.body.inventory,
        });

        const worker = await doc.save();

        res.json(worker);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать работника',
        });
    }
}