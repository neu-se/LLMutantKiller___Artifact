import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  it('should not emit drain when writes are in flight', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Add multiple items to create in-flight writes
      db.set('key1', { value: 1 }, () => {});
      db.set('key2', { value: 2 }, () => {});
      db.set('key3', { value: 3 }, () => {});

      // Listen for drain event
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Check immediately if drain was emitted while writes are in flight
      setTimeout(() => {
        if (drainEmitted) {
          db.close();
          fs.rmSync(testDir, { recursive: true, force: true });
          done(new Error('Drain was emitted while writes were still in flight'));
        } else {
          db.close();
          fs.rmSync(testDir, { recursive: true, force: true });
          done();
        }
      }, 50);
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});