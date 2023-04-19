"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceInputValues = exports.dataSourceValues = void 0;
function dataSourceValues(databaseInfo) {
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
exports.dataSourceValues = dataSourceValues;
function dataSourceInputValues(databaseInfo) {
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
exports.dataSourceInputValues = dataSourceInputValues;
//# sourceMappingURL=functions.utilities.js.map