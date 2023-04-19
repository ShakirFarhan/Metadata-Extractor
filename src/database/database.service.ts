import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { QeuryDto, databaseRequest, idDto } from './types';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { dataSourceInputValues, dataSourceValues } from './utilities';
export let connectDB: DataSource;
@Injectable()
export class DatabaseService {
  private connections = new Map<string, idDto>();
  constructor(private readonly config: ConfigService) {}
  async getDatabaseConnection(databaseInfo: databaseRequest): Promise<string> {
    try {
      const existingConnectionId: string = this.getConnectionByDetails(
        databaseInfo.databasetype,
        dataSourceInputValues(databaseInfo),
      );

      if (existingConnectionId) {
        return existingConnectionId;
      }
      connectDB = new DataSource(dataSourceInputValues(databaseInfo));

      await connectDB.initialize();
      const connectionId: string = this.generateConnectionId(
        databaseInfo.databasetype,

        dataSourceInputValues(databaseInfo),
      );
      this.connections.set(connectionId, dataSourceInputValues(databaseInfo));

      return connectionId;
    } catch (err) {
      throw new BadRequestException('Invalid Database Credentials! Try Again');
    }
  }
  private getConnectionByDetails(
    databaseType: string,
    databaseInfo: idDto,
  ): string {
    const connectionId: string = this.generateConnectionId(
      databaseType,
      databaseInfo,
    );
    return this.connections.has(connectionId) ? connectionId : null;
  }

  private generateConnectionId(
    databaseType: string,
    databaseInfo: idDto,
  ): string {
    const { host, port, username } = databaseInfo;
    return `${databaseType}-${host}:${port}-${username}`;
  }

  async getQuery(query: QeuryDto): Promise<any[] | 'No Database Connection'> {
    if (!this.connections.has(query.connectionId)) {
      throw new UnauthorizedException("You don't have access to this database");
    } else {
      try {
        if (query.schema) {
          return this.listTablesAndViews(query.connectionId, query.schema);
        } else {
          return this.listSchemas(query.connectionId);
        }
      } catch (error) {
        throw new BadRequestException('Something Went Wrong! Try Again');
      }
    }
  }

  async listSchemas(connectionId: string): Promise<string[]> {
    const databsedata: idDto = this.connections.get(connectionId);
    const connectDB = new DataSource(dataSourceValues(databsedata));
    await connectDB.initialize();

    const schemas = await connectDB.query(
      `SELECT schema_name FROM information_schema.schemata;`,
    );
    await connectDB.destroy();

    return schemas.map((schema) => schema.schema_name);
  }

  async listTablesAndViews(
    connectionId: string,
    schemaName: string,
  ): Promise<any[]> {
    const databsedata: idDto = this.connections.get(connectionId);

    const connectDB = new DataSource(dataSourceValues(databsedata));
    await connectDB.initialize();

    const tablesAndViews = await connectDB.query(`
      SELECT table_name, table_type, is_insertable_into
      FROM information_schema.tables
      WHERE table_schema = '${schemaName}';
    `);

    await connectDB.destroy();

    return tablesAndViews;
  }
}
