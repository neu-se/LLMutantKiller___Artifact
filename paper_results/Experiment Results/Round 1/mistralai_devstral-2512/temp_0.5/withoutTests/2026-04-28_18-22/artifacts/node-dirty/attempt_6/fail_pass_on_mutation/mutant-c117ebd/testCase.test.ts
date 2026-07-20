import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding', () => {
  const testDir = path.join(__dirname, 'test-dirty-encoding');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should correctly handle multi-byte UTF-8 characters in keys', (done) => {
    const db = new Dirty(dbPath);
    const testKey = '🔑';
    const testValue = { data: 'test' };

    db.on('load', () => {
      db.set(testKey, testValue, (err: Error | null) => {
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