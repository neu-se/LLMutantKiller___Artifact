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

  it('should emit drain event when queue is empty after writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      db.on('drain', () => {
        if (!drainEmitted) {
          drainEmitted = true;
          // At this point, all writes should be complete and queue empty
          // The mutation would prevent the drain event from being emitted
          // when queue is empty but inFlightWrites is 0
          expect(db.size()).toBe(1);
          done();
        }
      });

      // Add one item to trigger flush
      db.set('testKey', { test: 'value' }, () => {});
    });
  });
});