import { INestApplication, Module, HttpStatus } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import request from 'supertest';

import { initializeSwagger } from '../swagger.doc';

@Module({})
class MockedModule {}

const createTestModule = (): Promise<TestingModule> => {
  return Test.createTestingModule({
    imports: [MockedModule],
  }).compile();
};

describe('Swagger', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await createTestModule()).createNestApplication();
    initializeSwagger(app);
    await app.init();
  });

  it('should success access path docs', () => {
    return request(app.getHttpServer()).get('/api/docs').expect(HttpStatus.OK);
  });
});
