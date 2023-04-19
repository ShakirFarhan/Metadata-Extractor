"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = exports.connectDB = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const utilities_1 = require("./utilities");
let DatabaseService = class DatabaseService {
    constructor(config) {
        this.config = config;
        this.connections = new Map();
    }
    async getDatabaseConnection(databaseInfo) {
        try {
            const existingConnectionId = this.getConnectionByDetails(databaseInfo.databasetype, (0, utilities_1.dataSourceInputValues)(databaseInfo));
            if (existingConnectionId) {
                return existingConnectionId;
            }
            exports.connectDB = new typeorm_1.DataSource((0, utilities_1.dataSourceInputValues)(databaseInfo));
            await exports.connectDB.initialize();
            const connectionId = this.generateConnectionId(databaseInfo.databasetype, (0, utilities_1.dataSourceInputValues)(databaseInfo));
            this.connections.set(connectionId, (0, utilities_1.dataSourceInputValues)(databaseInfo));
            return connectionId;
        }
        catch (err) {
            throw new common_1.BadRequestException('Invalid Database Credentials! Try Again');
        }
    }
    getConnectionByDetails(databaseType, databaseInfo) {
        const connectionId = this.generateConnectionId(databaseType, databaseInfo);
        return this.connections.has(connectionId) ? connectionId : null;
    }
    generateConnectionId(databaseType, databaseInfo) {
        const { host, port, username } = databaseInfo;
        return `${databaseType}-${host}:${port}-${username}`;
    }
    async getQuery(query) {
        if (!this.connections.has(query.connectionId)) {
            throw new common_1.UnauthorizedException("You don't have access to this database");
        }
        else {
            try {
                if (query.schema) {
                    return this.listTablesAndViews(query.connectionId, query.schema);
                }
                else {
                    return this.listSchemas(query.connectionId);
                }
            }
            catch (error) {
                throw new common_1.BadRequestException('Something Went Wrong! Try Again');
            }
        }
    }
    async listSchemas(connectionId) {
        const databsedata = this.connections.get(connectionId);
        const connectDB = new typeorm_1.DataSource((0, utilities_1.dataSourceValues)(databsedata));
        await connectDB.initialize();
        const schemas = await connectDB.query(`SELECT schema_name FROM information_schema.schemata;`);
        await connectDB.destroy();
        return schemas.map((schema) => schema.schema_name);
    }
    async listTablesAndViews(connectionId, schemaName) {
        const databsedata = this.connections.get(connectionId);
        const connectDB = new typeorm_1.DataSource((0, utilities_1.dataSourceValues)(databsedata));
        await connectDB.initialize();
        const tablesAndViews = await connectDB.query(`
      SELECT table_name, table_type, is_insertable_into
      FROM information_schema.tables
      WHERE table_schema = '${schemaName}';
    `);
        await connectDB.destroy();
        return tablesAndViews;
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map