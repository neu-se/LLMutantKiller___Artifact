import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior with pending operations', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should close immediately when queue is empty but writes are in flight', (done) => {
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set up initial data and callback
      db.set('testKey', { data: 'initial' }, () => {
        // Clear the queue but keep inFlightWrites > 0
        db._queue.clear();
        db._inFlightWrites = 1;

        let closeCompleted = false;
        let writeCloseEmitted = false;
        let drainEmitted = false;

        db.on('drain', () => {
          drainEmitted = true;
        });

        db.on('write_close', () => {
          writeCloseEmitted = true;
          if (closeCompleted) {
            // Original code: should close immediately (queue empty)
            // Mutated code: would wait for drain (which never comes)
            expect(writeCloseEmitted).toBe(true);
            expect(drainEmitted).toBe(false);
            done();
          }
        });

        // Original code: should close immediately (queue empty)
        // Mutated code: would wait for drain (which never comes)
        db.close();
        closeCompleted = true;

        // Simulate the write completing
        setImmediate(() => {
          db._inFlightWrites = 0;
          if (!db._waitForDrain && db._inFlightWrites <= 0) {
            db.emit('drain');
          }
        });
      });
    });
  });
});