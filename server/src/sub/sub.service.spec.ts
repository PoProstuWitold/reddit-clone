import { Test, TestingModule } from '@nestjs/testing';
import { SubService } from './sub.service';

describe('SubService', () => {
  let service: SubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubService],
    }).compile();

    service = module.get<SubService>(SubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
