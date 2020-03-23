import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MongoDbServer } from '../src/db-handler';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    await new MongoDbServer().init();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cars (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/cars')
      .expect(200)
      .end(done)
  });
  it('/cars (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/cars')
      .send({
        "owners": [
            {
                "id": "5e786feefbbd9a2e16ca5a08",
                "name": "aaa",
                "purchaseDate": "2019-02-04T22:44:30.652Z"
            },
            {
                "id": "5e786feefbbd9a2e16ca5a09",
                "name": "aswww",
                "purchaseDate": "2012-02-04T22:44:30.652Z"
            },
            {
                "id": "5e786feefbbd9a2e16ca5a0a",
                "name": "aswww",
                "purchaseDate": "2019-01-23T22:44:30.652Z"
            }
        ],
        "manufacturer": {
            "id": "5e786feefbbd9a2e16ca5a07",
            "name": "qqqqq",
            "phone": "202-555-0174",
            "siret": 794652115
        },
        "id": "5e786feefbbd9a2e16ca5a06",
        "firstRegistrationDate": "2019-02-04T22:44:30.652Z",
        "price": 13500
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end(done)
  });
  it('/cars/trigger-process/ (GET)', (done) => {
    return request(app.getHttpServer())
      .post('/cars/trigger-process')
      .expect(202)
      .end(done)
  });
});
