import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database encoding', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should correctly handle UTF-8 encoded data with special characters', (done) => {
    const db = new Dirty(dbPath);
    const testKey = 'testKey';
    const testValue = { data: 'café', emoji: '😀', special: '\u0000' };

    db.on('load', () => {
      db.set(testKey, testValue, (err) => {
        if (err) return done(err);

        db.close();

        // Reopen the database to verify persistence
        const db2 = new Dirty(dbPath);
        db2.on('load', () => {
          const retrievedValue = db2.get(testKey);
          expect(retrievedValue).toEqual(testValue);
          db2.close();
          done();
        });
      });
    });
  });
});