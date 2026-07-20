import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with exact write count verification', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when inFlightWrites becomes exactly zero (not negative)', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writeCallbacks = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // First write
      db.set('key1', { value: 'test1' }, () => {
        writeCallbacks++;
        if (writeCallbacks === 2) {
          // After both writes complete, verify drain was emitted exactly once
          setImmediate(() => {
            expect(drainCount).toBe(1);
            done();
          });
        }
      });

      // Second write
      db.set('key2', { value: 'test2' }, () => {
        writeCallbacks++;
        if (writeCallbacks === 2) {
          setImmediate(() => {
            expect(drainCount).toBe(1);
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