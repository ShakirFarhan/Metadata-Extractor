import { QeuryDto, databaseRequest } from './types';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare let connectDB: DataSource;
export declare class DatabaseService {
    private readonly config;
    private connections;
    constructor(config: ConfigService);
    getDatabaseConnection(databaseInfo: databaseRequest): Promise<string>;
    private getConnectionByDetails;
    private generateConnectionId;
    getQuery(query: QeuryDto): Promise<any[] | 'No Database Connection'>;
    listSchemas(connectionId: string): Promise<string[]>;
    listTablesAndViews(connectionId: string, schemaName: string): Promise<any[]>;
}
