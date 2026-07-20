import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database load', () => {
  it('should emit error for empty lines in database file', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Setup: Create test directory and write data with empty line
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(dbPath, '{"key":"testKey","val":"testValue"}\n\n');

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      try {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Empty lines never appear in a healthy database');
        db.close();
        rimraf.sync(testDir);
        done();
      } catch (error) {
        db.close();
        rimraf.sync(testDir);
        done(error);
      }
    });

    db.on('load', () => {
      db.close();
      rimraf.sync(testDir);
      done(new Error('Expected error event but got load event'));
    });
  });
});