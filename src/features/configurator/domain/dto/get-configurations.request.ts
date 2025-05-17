import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class GetConfigurationsRequest {
    @ApiProperty({ example: 10, description: 'limit' })
    @IsInt()
    @Min(1)
    limit: number;

    @ApiProperty({ example: 0, description: 'offset' })
    @IsInt()
    @Min(0)
    offset: number;
}
