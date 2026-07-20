import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event timing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
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

  it('should not emit drain when queue has items but writes are in flight', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writesStarted = 0;

    db.on('load', () => {
      // Add items that will trigger backpressure
      db.set('key1', { value: 'x'.repeat(10000) }, () => {
        writesStarted++;
        if (writesStarted === 2) {
          setImmediate(() => {
            if (drainEmitted) {
              done(new Error('Drain emitted while writes were still in flight'));
            } else {
              done();
            }
          });
        }
      });

      db.set('key2', { value: 'y'.repeat(10000) }, () => {
        writesStarted++;
        if (writesStarted === 2) {
          setImmediate(() => {
            if (drainEmitted) {
              done(new Error('Drain emitted while writes were still in flight'));
            }
          });
        }
      });
    });

    db.on('drain', () => {
      drainEmitted = true;
      // In mutated code, this will trigger immediately even with items in queue
      if (db._queue.size > 0 || db._inFlightWrites > 0) {
        done(new Error('Drain emitted prematurely with items still in queue'));
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});