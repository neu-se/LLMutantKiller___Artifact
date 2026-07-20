import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error handling', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit error event when write stream encounters an error', (done) => {
    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Force an error by writing to a non-writable stream
      const originalWrite = db._writeStream.write;
      db._writeStream.write = (data, callback) => {
        const error = new Error('Simulated write error');
        if (callback) {
          setImmediate(() => callback(error));
        }
        return false;
      };

      db.on('error', (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Simulated write error');
        done();
      });

      db.set('test-key', { value: 'test-value' }, () => {});
    });
  });
});