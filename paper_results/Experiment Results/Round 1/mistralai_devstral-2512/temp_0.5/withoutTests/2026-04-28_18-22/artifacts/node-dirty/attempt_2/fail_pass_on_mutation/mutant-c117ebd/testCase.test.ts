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

  it('should correctly handle non-ASCII characters in keys and values', (done) => {
    const db = new Dirty(dbPath);
    const testKey = 'café';
    const testValue = { data: 'naïve résumé', special: '日本語' };

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