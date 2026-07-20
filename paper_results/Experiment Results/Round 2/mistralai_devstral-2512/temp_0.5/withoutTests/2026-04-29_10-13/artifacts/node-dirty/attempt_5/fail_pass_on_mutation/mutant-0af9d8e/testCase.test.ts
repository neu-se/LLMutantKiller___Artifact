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

  it('should emit drain event only when inFlightWrites reaches zero', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      db.on('drain', () => {
        if (drainEmitted) {
          done(new Error('drain event emitted multiple times'));
          return;
        }
        drainEmitted = true;

        // Verify the drain event was emitted correctly
        // In the original code, drain emits when inFlightWrites <= 0
        // In the mutated code, it emits when inFlightWrites > 0 (incorrectly)
        setImmediate(() => {
          expect(db.size()).toBe(1);
          db.close();
          done();
        });
      });

      // Trigger a write operation
      db.set('testKey', { value: 1 }, () => {
        // Write callback - this doesn't guarantee drain has been emitted yet
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});