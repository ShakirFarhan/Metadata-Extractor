import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class databaseRequest {
  @IsString()
  @IsNotEmpty()
  databasetype: 'postgres' | 'mysql';
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsNumber()
  @IsNotEmpty()
  port: number;
  @IsString()
  @IsNotEmpty()
  host: string;
}

export interface idDto {
  host: string;
  port: number;
  username: string;
  type: 'postgres' | 'mysql';
  password: string;
  entities: Array<any>;
  synchronize: boolean;
}
export interface QeuryDto {
  connectionId: string;
  schema?: string | undefined;
  database?: string | undefined;
}
