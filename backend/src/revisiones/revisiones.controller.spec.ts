import { Test, TestingModule } from '@nestjs/testing';
import { RevisionesController } from './revisiones.controller';
import { RevisionesService } from './revisiones.service';

describe('RevisionesController', () => {
  let controller: RevisionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevisionesController],
      providers: [RevisionesService],
    }).compile();

    controller = module.get<RevisionesController>(RevisionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
