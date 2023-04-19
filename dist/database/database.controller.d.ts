import { DatabaseService } from './database.service';
import { QeuryDto, databaseRequest } from './types';
export declare class DatabaseController {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getConnection(databaseInfo: databaseRequest): Promise<string>;
    getQuery(queryDto: QeuryDto): Promise<any[] | "No Database Connection">;
}
