import { 
  test, 
  expect, 
  describe, 
  beforeEach,
  afterEach
} from '@jest/globals';
import {
  createDataSource,
  destroyConnection
} from '../setup/connection';
import { DataSource } from 'typeorm';
import User from '../../entities/User';

describe('test', () => {
  
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = await createDataSource<User>([ User ]);
  });

  afterEach(async () => {
    destroyConnection(dataSource);
  });

  describe('test it works', () => {
    test('insert and find user', async () => {
      const userRepository = dataSource.getRepository(User);
  
      await userRepository.insert({
        username: 'test'
      });
  
      const testUser = await userRepository.findOneBy({
        id: 1,
      });
  
      if (testUser) {
        expect(testUser.username).toBe('test');
      }
    });
  });
});




