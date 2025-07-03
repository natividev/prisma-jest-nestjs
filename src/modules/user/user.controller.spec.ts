import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create with correct data', async () => {
    const dto: CreateUserDto = { username: 'nativi.dev', name: 'Natividad' };
    const created = { id: 1, ...dto };
    mockUserService.create.mockResolvedValue(created);

    const result = await controller.create(dto);
    expect(result).toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all users', async () => {
    const users = [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
    ];
    mockUserService.findAll.mockResolvedValue(users);

    const result = await controller.findAll();
    expect(result).toEqual(users);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return user by id', async () => {
    const user = { id: 1, username: 'user1' };
    mockUserService.findOne.mockResolvedValue(user);

    const result = await controller.findOne('1');
    expect(result).toEqual(user);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update user by id', async () => {
    const dto: UpdateUserDto = { name: 'Updated Name' };
    const updated = { id: 1, username: 'user1', ...dto };
    mockUserService.update.mockResolvedValue(updated);

    const result = await controller.update('1', dto);
    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove user by id', async () => {
    const deleted = { id: 1, username: 'deleteduser' };
    mockUserService.remove.mockResolvedValue(deleted);

    const result = await controller.remove('1');
    expect(result).toEqual(deleted);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
