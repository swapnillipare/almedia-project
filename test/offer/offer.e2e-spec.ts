import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OfferModule } from '../../src/modules/offer/offer.module';
import { offer1 } from '../../test/payload/payload.offer1';
import { offer2 } from '../../test/payload/payload.offer2';

describe('OfferController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OfferModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/offers/getOffer/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/offers/getOffer/')
      .expect(200)
      .expect('Here is the offer for you !!');
  });


  it('POST Offer1 Payload ', () => {
    return request(app.getHttpServer())
    .post('/offers/offer1')
    .send(offer1)
    .expect(201)
  });

  it('POST Offer2 Payload ', () => {
    return request(app.getHttpServer())
    .post('/offers/offer2')
    .send(offer2)
    .expect(204)
  });
});
