import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { EmojiService } from 'src/emoji/emoji.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let emojiService: EmojiService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    emojiService = app.get(EmojiService);
    server = app.getHttpServer();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(server).get('/').expect(200).expect('Hello World!');
  // });

  // it('/emoji (GET)', () => {
  //   return request(server).get('/emoji').expect(200).expect('Hello World!');
  // });

  describe('/ (GET)', () => {
    it('should return 403 if invalid or empty x-api-key is used', () => {
      return request(server).get('/').set('x-api-key', 'INVALID').expect(403);
    });
    it('should return 403 if empty x-api-key is used', () => {
      return request(server).get('/').set('x-api-key', '').expect(403);
    });
    it('should return 403 if no x-api-key is used', () => {
      return request(server).get('/').expect(403);
    });
    it('should return hello world', () => {
      return request(server)
        .get('/')
        .set('x-api-key', 'SECRET')
        .expect(200)
        .expect(({ body }) => {
          expect(body.data).toBeDefined();
        });
    });
  });

  describe('/emoji (GET)', () => {
    it('should return 403 if invalid or empty x-api-key is used', () => {
      return request(server)
        .get('/emoji')
        .set('x-api-key', 'INVALID')
        .expect(403);
    });
    it('should return 403 if empty x-api-key is used', () => {
      return request(server).get('/emoji').set('x-api-key', '').expect(403);
    });
    it('should return 403 if no x-api-key is used', () => {
      return request(server).get('/emoji').expect(403);
    });

    it('should return a random emoji', () => {
      const emojis = emojiService.getEmojis();
      return request(server)
        .get('/emoji')
        .set('x-api-key', 'SECRET')
        .expect(200)
        .expect(({ body }) => {
          expect(emojis).toContain(body.data.emoji);
          expect(body.data.browser).toBe('Unknown');
        });
    });

    it('should return an user agent', () => {
      const emojis = emojiService.getEmojis();
      return request(server)
        .get('/emoji')
        .set('x-api-key', 'SECRET')
        .set('User-Agent', 'Thunder Client (https://www.thunderclient.com)')
        .expect(200)
        .expect(({ body }) => {
          expect(emojis).toContain(body.data.emoji);
          expect(body.data.browser).toBe('Thunder');
        });
    });

    it('should return an emoji by index from query', () => {
      const emojis = emojiService.getEmojis();
      const index = 0;
      const emoji = emojis[index];
      return request(server)
        .get(`/emoji?index=${index}`)
        .set('x-api-key', 'SECRET')
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.emoji).toBe(emoji);
        });
    });

    it('should return an 400 if index out of range', () => {
      const emojis = emojiService.getEmojis();
      const range = emojis.length + 1;
      return request(server)
        .get(`/emoji?index=${range}`)
        .set('x-api-key', 'SECRET')
        .expect(400);
    });

    it('should return an 400 if index not a number', () => {
      return request(server)
        .get(`/emoji?index=not a number`)
        .set('x-api-key', 'SECRET')
        .expect(400);
    });
  });
});
