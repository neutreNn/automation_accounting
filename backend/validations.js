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
    body('date_of_issue', 'Введите дату выдачи').isString(),
    body('created_date', 'Введите дату производства').isString(),
    body('purchase_date', 'Введите дату покупки').isString(),
    body('warranty_expiration', 'Введите срок действия гарантии').isString(),
    body('price', 'Введите цену инвентаря').isNumeric(),
    body('supplier', 'Введите производителя инвентаря').isString(),
    body('history', 'Введите историю владения').isArray(),
    body('barcodeUrl', 'Предоставьте ссылку на штрихкод').isString(),
];