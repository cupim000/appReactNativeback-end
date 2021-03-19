import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  birthdate: Date;
  cpf: string;
  celphone: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

class CreateUserService {
  public async execute({
    name,
    birthdate,
    cpf,
    celphone,
    email,
    isAdmin,
    password,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: [{ cpf }, { email }],
    });

    if (checkUserExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      birthdate,
      cpf,
      celphone,
      email,
      isAdmin,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
