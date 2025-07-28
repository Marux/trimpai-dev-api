import { PartialType } from '@nestjs/swagger';
import { CreateCreateParagraphDto } from './create-create-paragraph.dto';

export class UpdateCreateParagraphDto extends PartialType(CreateCreateParagraphDto) {}
