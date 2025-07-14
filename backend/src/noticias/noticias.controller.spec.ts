import { Test, TestingModule } from '@nestjs/testing';
import { NoticiasController } from './noticias.controller';
import { NoticiasService } from './noticias.service';

describe('NoticiasController', () => {
  let controller: NoticiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticiasController],
      providers: [NoticiasService],
    }).compile();

    controller = module.get<NoticiasController>(NoticiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
