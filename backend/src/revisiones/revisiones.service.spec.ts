import { Test, TestingModule } from '@nestjs/testing';
import { RevisionesService } from './revisiones.service';

describe('RevisionesService', () => {
  let service: RevisionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevisionesService],
    }).compile();

    service = module.get<RevisionesService>(RevisionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
