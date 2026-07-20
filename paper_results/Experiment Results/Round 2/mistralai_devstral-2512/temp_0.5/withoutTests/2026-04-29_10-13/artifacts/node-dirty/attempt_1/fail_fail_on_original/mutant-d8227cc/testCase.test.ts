import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should correctly process chunks without newlines', (done) => {
    const db = new Dirty(dbPath);
    const testData = { key: 'testKey', val: 'testValue' };

    db.on('load', () => {
      // Write data without newline to trigger the chunk processing
      fs.writeFileSync(dbPath, JSON.stringify(testData), 'utf-8');

      // Force reloading to process the chunk
      const db2 = new Dirty(dbPath);
      db2.on('load', () => {
        // The database should not emit an error and should load correctly
        expect(db2.get('testKey')).toBe('testValue');
        done();
      });

      db2.on('error', (err) => {
        done(err);
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});