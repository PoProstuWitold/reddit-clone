import { Test, TestingModule } from '@nestjs/testing';
import { SubController } from './sub.controller';

describe('SubController', () => {
  let controller: SubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubController],
    }).compile();

    controller = module.get<SubController>(SubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
