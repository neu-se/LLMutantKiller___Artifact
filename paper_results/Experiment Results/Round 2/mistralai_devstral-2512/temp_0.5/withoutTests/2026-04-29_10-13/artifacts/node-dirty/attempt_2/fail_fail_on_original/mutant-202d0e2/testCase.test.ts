import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should emit drain event when write stream becomes available after being busy', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Fill the write buffer to trigger _waitForDrain
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, { value: i }, () => {});
      }

      // After a short delay, set another key which should trigger _flush
      setTimeout(() => {
        db.set('finalKey', { value: 'final' }, () => {
          if (!drainEmitted) {
            done(new Error('Drain event was not emitted when expected'));
          }
        });
      }, 100);
    });

    db.on('drain', () => {
      drainEmitted = true;
    });

    // Safety timeout
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 2000);
  });
});