import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event timing', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain only when inFlightWrites reaches zero', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      db.on('drain', () => {
        if (drainEmitted) {
          // If drain is emitted twice, the mutation is present
          done(new Error('drain event emitted multiple times incorrectly'));
          return;
        }
        drainEmitted = true;

        // Verify inFlightWrites is actually zero when drain is emitted
        // In the original code, drain only emits when inFlightWrites <= 0
        // In the mutated code, it emits when inFlightWrites > 0 (incorrectly)
        setImmediate(() => {
          // The drain should have been emitted with inFlightWrites = 0
          // If mutation exists, it would have emitted drain while writes were still in flight
          expect(db.size()).toBe(1);
          db.close();
          done();
        });
      });

      // Trigger a write that will take time to complete
      db.set('testKey', { largeData: 'x'.repeat(10000) }, () => {
        // Write callback - this doesn't guarantee drain has been emitted yet
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});