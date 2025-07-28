import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCreateParagraphDto {
    
    @ApiProperty({
        description: 'Texto del párrafo',
        example: 'Este es el primer párrafo de la noticia.',
    })
    @IsNotEmpty({ message: 'El texto es obligatorio.' })
    @IsString({ message: 'El texto debe ser una cadena de texto.' })
    texto: string;

    @IsOptional()
    @IsBoolean({ message: 'El campo status debe ser booleano.' })
    status?: boolean;

    @IsOptional()
    @IsBoolean({ message: 'El campo isDeleted debe ser booleano.' })
    isDeleted?: boolean;

    @IsOptional()
    @IsUUID('4', { message: 'El campo createdBy debe ser un UUID válido.' })
    createdBy?: string;

    @IsOptional()
    @IsUUID('4', { message: 'El campo modifiedBy debe ser un UUID válido.' })
    modifiedBy?: string;
}
