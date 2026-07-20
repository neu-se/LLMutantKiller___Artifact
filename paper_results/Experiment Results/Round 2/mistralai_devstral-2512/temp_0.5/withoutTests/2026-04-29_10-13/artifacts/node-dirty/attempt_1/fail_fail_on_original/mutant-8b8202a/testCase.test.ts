import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event only when all writes are complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let loadCount = 0;

    db.on('load', () => {
      loadCount++;
      if (loadCount === 1) {
        // First write
        db.set('key1', { value: 'test1' }, () => {
          // Second write
          db.set('key2', { value: 'test2' }, () => {
            // Third write
            db.set('key3', { value: 'test3' }, () => {
              // All writes should be complete now
              setImmediate(() => {
                expect(drainCount).toBe(1);
                done();
              });
            });
          });
        });
      }
    });

    db.on('drain', () => {
      drainCount++;
      // In the mutated version, drain would be emitted multiple times incorrectly
      if (drainCount > 1) {
        done(new Error('drain event emitted too many times'));
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});