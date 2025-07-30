import { IsNotEmpty, IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCreateVideoDto {
    @ApiProperty({
        description: 'Descripcion del video',
        maxLength: 50,
        example: 'Decripcion de ejemplo',
    })
    @IsNotEmpty({ message: 'La descripción es obligatoria.' })
    @IsString({ message: 'La descripción debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'La descripción no puede tener más de 50 caracteres.' })
    descripcion: string;

    @ApiProperty({
        description: 'URL del video',
        example: 'https://example.com/video.mp4',
    })
    @IsNotEmpty({ message: 'La URL del video es obligatoria.' })
    @IsString({ message: 'La URL del video debe ser una cadena de texto.' })
    link: string;

    @ApiPropertyOptional({
        description: 'Indica si la imagen es portada',
        example: true,
        default: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo portada debe ser un valor booleano.' })
    portada?: boolean;
}
