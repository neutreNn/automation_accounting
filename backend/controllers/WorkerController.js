import WorkerModel from '../models/Worker.js'

export const getAll = async (req, res) => {

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
        const workerId = req.params.id;

        const doc = await WorkerModel.findOne({ _id: workerId });

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
        const workerId = req.params.id;

        const doc = await WorkerModel.findOneAndDelete({ _id: workerId });

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
        const workerId = req.params.id;
        
        await WorkerModel.updateOne(
            {
                _id: workerId,
            },
            {
                fio: req.body.fio,
                date_of_birth: req.body.date_of_birth,
                employee_number: req.body.employee_number,
                passport: req.body.passport,
                inn_number: req.body.inn_number,
                post: req.body.post,
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