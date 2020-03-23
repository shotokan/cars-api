import { MongoMemoryServer } from 'mongodb-memory-server';

export class MongoDbServer {
  mongod: MongoMemoryServer;
  static uri: string;
  static port: number;
  static dbPath: string;
  static dbName: string;

  constructor() {
    this.mongod = new MongoMemoryServer({
      instance: {
        port: 62917,
      },
    });
  }

  async init() {
    MongoDbServer.uri = await this.mongod.getConnectionString('ultra-io');
    MongoDbServer.port = await this.mongod.getPort();
    MongoDbServer.dbPath = await this.mongod.getDbPath();
    MongoDbServer.dbName = await this.mongod.getDbName();
  }
}
