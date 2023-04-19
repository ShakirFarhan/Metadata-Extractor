export declare class databaseRequest {
    databasetype: 'postgres' | 'mysql';
    username: string;
    password: string;
    port: number;
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
