import { 
  MixedList,
  DataSource, 
  EntitySchema
} from 'typeorm';

/**
 * Return a DataSource instance and synchronize the test db with provided Entities.
 * 
 * @param {Entity[]} entities Entities to synchronize to testing DB
 * @returns {Promise<DataSource>} DataSource for initialized testing DB
 */

export async function createDataSource<T>(
  entities: MixedList<string | Function | EntitySchema<T>> | undefined
): Promise<DataSource> {
  const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5555, // connect on non-standard port to docker PostgreSQL instance
    username: "tester",
    password: "tester",
    database: "testing_db",
    entities: entities,
    synchronize: true
  });

  try {
    return await dataSource.initialize();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

/**
 * Close connection with a DataSource.
 * 
 * @param {DataSource} dataSource TypeORM DataSource to disconnect
 */
export async function destroyConnection(
  dataSource: DataSource
): Promise<void> {
  try {
    dataSource.destroy();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

