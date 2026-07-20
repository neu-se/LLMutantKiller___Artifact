import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database encoding', () => {
  const testDir = path.join(__dirname, 'test-dirty-encoding');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should correctly handle UTF-8 encoded special characters', (done) => {
    const db = new Dirty(dbPath);
    const testKey = 'test';
    const testValue = { emoji: '😀', chinese: '你好', accented: 'café' };

    db.on('load', () => {
      db.set(testKey, testValue, (err) => {
        expect(err).toBeNull();

        db.close();

        const readDb = new Dirty(dbPath);
        readDb.on('load', () => {
          const retrievedValue = readDb.get(testKey);
          expect(retrievedValue).toEqual(testValue);
          readDb.close();
          done();
        });
      });
    });
  });
});