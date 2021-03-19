import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      birthdate,
      cpf,
      celphone,
      email,
      password,
      isAdmin,
    } = request.body;

    const createUser = new CreateUserService();

    const formatedDate = parseISO(birthdate);

    const user = await createUser.execute({
      name,
      birthdate: formatedDate,
      cpf,
      celphone,
      email,
      password,
      isAdmin,
    });

    delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default userRouter;
