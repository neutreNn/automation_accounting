import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const gearCreateValidation = [
    body('name', 'Введите название инвентаря').isLength({ min: 3 }).isString(),
    body('category', 'Введите категорию').isString(),
    body('serial_number', 'Введите серийный номер').isLength({ min: 5 }).isString(),
    body('inventory_number', 'Введите инвентарный номер').isString(),
    body('year_of_release', 'Введите год выпуска').isString(),
    body('year_of_input', 'Введите год ввода').isString(),
    body('year_of_output', 'Введите год списания').isString(),
    body('price', 'Введите цену инвентаря').isNumeric(),
    body('supplier', 'Введите производителя инвентаря').isString(),
    body('location', 'Введите метонахождение').isString(),
];

export const workerCreateValidation = [
    body('fio', 'Введите ФИО работника').isLength({ min: 5 }).isString(),
    body('date_of_birth', 'Введите дату рождения').isString(),
    body('employee_number', 'Введите табельный номер').isLength({ min: 5 }).isString(),
    body('passport', 'Введите данные паспорта').isLength({ max: 11, min: 11 }).isString(),
    body('inn_number', 'Введите ИНН').isLength({ max: 12, min: 12 }).isString(),
    body('phone_number', 'Введите номер телефона').isLength({ max: 12, min: 12 }).isString(),
    body('post', 'Введите должность').isString(),
];