import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should emit drain event when write stream drains with empty queue', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      db.on('drain', () => {
        if (!drainEmitted) {
          drainEmitted = true;
          // Verify the drain was emitted when queue is empty
          expect(db._queue.size).toBe(0);
          expect(db._inFlightWrites).toBe(0);
          done();
        }
      });

      // Write enough data to potentially trigger drain
      const data = { value: 'x'.repeat(10000) };
      db.set('key1', data, () => {});
    });
  });
});