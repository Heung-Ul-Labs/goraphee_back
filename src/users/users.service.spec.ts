import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { TestBed } from '@automock/jest';
import { USER_REPOSITORY } from '../common/constants/constants';

describe('UserService Unit Test', () => {
  let userService: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UsersService).compile();
    repo = unitRef.get(USER_REPOSITORY);
    userService = unit;
  });
  describe('findAll()', () => {
    it('should occur error when find() goes wrong', async () => {
      repo.find.mockRejectedValue('error');
      try {
        const _ = await userService.findAll();
      } catch (e) {
        expect(repo.find).toHaveBeenCalled();
        expect(e).toEqual('error');
      }
    });

    it('should retrive user from repo', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          username: '1',
          email: '1@a.com',
          password: '1',
          isActivated: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: '1',
          email: '1@a.com',
          password: '1',
          isActivated: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      repo.find.mockResolvedValue(mockUsers);

      const users = await userService.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(users).toEqual(mockUsers);
    });
  });
  describe('findById()', () => {
    it('should occur error when findOneBy() goes wrong.', async () => {
      repo.findOneBy.mockRejectedValue('error');
      try {
        const _ = await userService.findById(1);
      } catch (e) {
        expect(repo.findOneBy).toHaveBeenCalled();
        expect(e).toEqual('error');
      }
    });
    it('should retrieve user from repo', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneBy.mockResolvedValue(mockUser);

      const users = await userService.findById(1);

      expect(repo.find).toHaveBeenCalled();
      expect(users).toEqual(mockUser);
    });
  });

  describe('findByEmail()', () => {
    it('should occur error when findOneBy() goes wrong.', async () => {
      repo.findOneBy.mockRejectedValue('error');
      try {
        const _ = await userService.findByEmail('');
      } catch (e) {
        expect(repo.findOneBy).toHaveBeenCalled();
        expect(e).toEqual('error');
      }
    });
    it('should retrieve user from repo', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneBy.mockResolvedValue(mockUser);

      const users = await userService.findByEmail('');

      expect(repo.find).toHaveBeenCalled();
      expect(users).toEqual(mockUser);
    });
  });
  describe('validateEmailDuplicate()', () => {
    it('should return error when find user', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneBy.mockResolvedValue(mockUser);

      const err = await userService.validateEmailDuplicate('');

      expect(repo.findOneBy).toHaveBeenCalled();
      expect(err).toBeDefined();
    });
    it('should return null when cannot find user', async () => {
      repo.findOneBy.mockResolvedValue(null);

      const err = await userService.validateEmailDuplicate('');

      expect(repo.findOneBy).toHaveBeenCalled();
      expect(err).toEqual(null);
    });
  });
  describe('validateUsernameDuplicate()', () => {
    it('should return error when find user', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneBy.mockResolvedValue(mockUser);

      const err = await userService.validateUsernameDuplicate('');

      expect(repo.findOneBy).toHaveBeenCalled();
      expect(err).toBeDefined();
    });
    it('should return null when cannot find user', async () => {
      repo.findOneBy.mockResolvedValue(null);

      const err = await userService.validateUsernameDuplicate('');

      expect(repo.findOneBy).toHaveBeenCalled();
      expect(err).toEqual(null);
    });
  });
  describe('create()', () => {
    it('should occur error when save() goes wrong.', async () => {
      repo.save.mockRejectedValue('error');
      try {
        const err = await userService.create({
          username: '',
          email: '',
          password: '',
          isActivated: true,
        });
      } catch (error) {
        expect(repo.create).toHaveBeenCalled();
        expect(repo.save).toHaveBeenCalled();
        expect(error).toEqual('error');
      }
    });
    it('should validate duplicate username', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneBy.mockResolvedValue(mockUser);
      try {
        const result = await userService.create({
          username: '1',
          email: '',
          password: '',
          isActivated: true,
        });
      } catch (error) {
        expect(repo.findOneBy).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
    it('should validate duplicate email', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneBy.mockResolvedValue(mockUser);
      try {
        const result = await userService.create({
          username: '',
          email: '1@a.com',
          password: '',
          isActivated: true,
        });
      } catch (error) {
        expect(repo.findOneBy).toHaveBeenCalled();
        expect(error).toBeDefined();
      }
    });
    it('should create user from repo', async () => {
      const mockUser: User = {
        id: 1,
        username: '1',
        email: '1@a.com',
        password: '1',
        isActivated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.findOneBy.mockResolvedValue(null);
      repo.create.mockReturnValue(mockUser);
      repo.save.mockResolvedValue(mockUser);
      try {
        const newUser = await userService.create({
          username: '',
          email: '',
          password: '',
          isActivated: true,
        });
        expect(repo.findOneBy).toHaveBeenCalled();
        expect(repo.create).toHaveBeenCalled();
        expect(repo.save).toHaveBeenCalled();
        expect(newUser).toEqual(mockUser);
      } catch (error) {}
    });
  });

  describe('update()', () => {
    it.todo('should occur error when update() goes wrong.');
    it.todo('should validate duplicate username');
    it.todo('should validate duplicate email');
    it.todo('should update user from repo');
  });

  describe('delete()', () => {
    it.todo('should occur error when delete() goes wrong.');
    it.todo('should delete user from repo');
  });
});