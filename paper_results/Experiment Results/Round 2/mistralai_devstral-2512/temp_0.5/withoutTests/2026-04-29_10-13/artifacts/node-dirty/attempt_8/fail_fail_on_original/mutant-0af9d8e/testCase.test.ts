import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event timing', () => {
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

  it('should emit drain event only when all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writeCallbacks = 0;
    const totalWrites = 3;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;

        // In original code, drain should only emit when all writes are complete
        // In mutated code, it might emit prematurely
        if (writeCallbacks < totalWrites) {
          done(new Error(`drain emitted before all writes completed (${writeCallbacks}/${totalWrites})`));
          return;
        }

        if (drainCount > 1) {
          done(new Error('drain emitted multiple times'));
          return;
        }

        setImmediate(() => {
          expect(db.size()).toBe(totalWrites);
          db.close();
          done();
        });
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