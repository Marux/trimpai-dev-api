import { PartialType } from '@nestjs/swagger';
import { CreateRevisionDto } from './create-revisione.dto';

export class UpdateRevisioneDto extends PartialType(CreateRevisionDto) {}
