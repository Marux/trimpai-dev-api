import { PartialType } from '@nestjs/swagger';
import { CreateCreateVideoDto } from './create-create-video.dto';

export class UpdateCreateVideoDto extends PartialType(CreateCreateVideoDto) {}
