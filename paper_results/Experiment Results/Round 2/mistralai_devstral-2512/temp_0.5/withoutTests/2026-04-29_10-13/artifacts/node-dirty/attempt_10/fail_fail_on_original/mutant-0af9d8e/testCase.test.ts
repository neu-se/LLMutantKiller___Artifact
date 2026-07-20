import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event condition', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should emit drain event only when all writes complete and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writeCallbacks = 0;
    const totalWrites = 2;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;

        // In original code, drain should only emit when all writes are complete
        // In mutated code, it might emit prematurely when inFlightWrites > 0
        if (writeCallbacks < totalWrites && drainCount > 1) {
          done(new Error('drain emitted multiple times before all writes completed'));
          return;
        }

        if (drainCount === 1 && writeCallbacks === totalWrites) {
          setImmediate(() => {
            expect(db.size()).toBe(totalWrites);
            db.close();
            done();
          });
        }
      });

      // Trigger multiple writes
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, { value: i }, () => {
          writeCallbacks++;
        });
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});