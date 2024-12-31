import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'

import { registerValidation, loginValidation, gearCreateValidation, workerCreateValidation } from './validations.js';

import { checkAuth, handleValidationErrors } from './utils/index.js'
import { UserController, GearController, WorkerController } from './controllers/index.js';

mongoose.connect(
    'mongodb+srv://vanibro1:vanibro1@cluster0.ynxp0dt.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0',
)
.then(() => {
    console.log('DB ok');
})
.catch((err) => {
    console.log('DB error', err)
});

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.get('/gears', checkAuth, GearController.getAll);
app.get('/gears/:id', checkAuth, GearController.getOne);
app.post('/gears', checkAuth, gearCreateValidation, handleValidationErrors, GearController.create);
app.delete('/gears/:id', checkAuth, handleValidationErrors, GearController.remove);
app.patch('/gears/:id', checkAuth, handleValidationErrors, GearController.update);

app.get('/workers', checkAuth, WorkerController.getAll);
app.get('/workers/:employee_number', checkAuth, WorkerController.getOne);
app.post('/workers', checkAuth, workerCreateValidation, handleValidationErrors, WorkerController.create);
app.delete('/workers/:employee_number', checkAuth, handleValidationErrors, WorkerController.remove);
app.patch('/workers/:employee_number', checkAuth, handleValidationErrors, WorkerController.update);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
})