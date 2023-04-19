import { databaseRequest, idDto } from '../types';

export function dataSourceValues(databaseInfo: idDto): idDto {
  return {
    type: databaseInfo.type,
    port: databaseInfo.port,
    username: databaseInfo.username,
    password: databaseInfo.password,
    host: databaseInfo.host,
    synchronize: true,
    entities: [],
  };
}
export function dataSourceInputValues(databaseInfo: databaseRequest): idDto {
  return {
    type: databaseInfo.databasetype,
    port: databaseInfo.port,
    username: databaseInfo.username,
    password: databaseInfo.password,
    host: databaseInfo.host,
    synchronize: true,
    entities: [],
  };
}
