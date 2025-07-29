import { PartialType } from '@nestjs/swagger';
import { CreateCreateImageDto } from './create-create-image.dto';

export class UpdateCreateImageDto extends PartialType(CreateCreateImageDto) {}
