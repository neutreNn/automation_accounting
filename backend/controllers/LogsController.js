import LogsModel from '../models/Logs.js'

export const getAll = async (req, res) => {

    const filters = { ...req.query };

    try {
        const logs = await LogsModel.find(filters).sort({ time: -1 });;

        res.json(logs);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить логи',
        });
    }
}

export const logAction = async ({ typeAction, module, action, user }) => {
    try {
      await LogsModel.create({
        typeAction,
        module,
        action,
        user,
      });
    } catch (err) {
      console.error('Ошибка записи лога:', err);
    }
  };