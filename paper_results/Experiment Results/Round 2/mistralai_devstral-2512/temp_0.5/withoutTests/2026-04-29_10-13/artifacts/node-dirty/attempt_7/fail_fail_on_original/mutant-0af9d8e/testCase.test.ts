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

  it('should emit drain event only when inFlightWrites is zero and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writeCompleted = false;

    db.on('load', () => {
      db.on('drain', () => {
        if (drainEmitted) {
          done(new Error('drain event emitted multiple times'));
          return;
        }
        drainEmitted = true;

        // The mutation changes the condition from <= 0 to > 0
        // This test verifies that drain is only emitted when writes are complete
        if (!writeCompleted) {
          done(new Error('drain emitted before write completed'));
          return;
        }

        setImmediate(() => {
          expect(db.size()).toBe(1);
          db.close();
          done();
        });
      });

      // Trigger a write with a large payload to ensure it takes time
      const largeData = { data: 'x'.repeat(10000) };
      db.set('testKey', largeData, () => {
        writeCompleted = true;
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});