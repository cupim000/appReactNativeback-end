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

userRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();

  const noPasswordUsers = users.map(user => {
    const newUser = user;
    delete newUser.password;
    return newUser;
  });

  return response.status(201).json(noPasswordUsers);
});

userRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error("Users doesn't exists");

    const noPasswordUser = user;
    delete noPasswordUser.password;

    return response.status(201).json(noPasswordUser);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

userRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { id } });
    if (!userExists) throw new Error("User doesn't exists");
    userRepository.remove(userExists);
    return response
      .status(201)
      .json({ message: `User ${userExists.id} removed` });
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default userRouter;
