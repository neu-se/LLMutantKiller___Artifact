import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with precise write tracking', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when inFlightWrites reaches exactly zero', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writeCallbackCount = 0;

    db.on('load', () => {
      // Track drain events
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Perform two writes
      db.set('key1', { value: 'test1' }, () => {
        writeCallbackCount++;
        if (writeCallbackCount === 2) {
          // After both writes complete, verify drain was emitted
          setImmediate(() => {
            expect(drainEmitted).toBe(true);
            done();
          });
        }
      });

      db.set('key2', { value: 'test2' }, () => {
        writeCallbackCount++;
        if (writeCallbackCount === 2) {
          setImmediate(() => {
            expect(drainEmitted).toBe(true);
            done();
          });
        }
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});