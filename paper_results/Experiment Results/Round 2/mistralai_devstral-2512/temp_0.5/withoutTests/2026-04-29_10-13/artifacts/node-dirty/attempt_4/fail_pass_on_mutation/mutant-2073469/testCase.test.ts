import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event emission', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event with correct event name', (done) => {
    const db = new Dirty(dbPath);
    let drainEventEmitted = false;
    let errorEventEmitted = false;

    db.on('load', () => {
      // Trigger writes that will cause drain
      db.set('key1', 'value1');
      db.set('key2', 'value2');
    });

    db.on('drain', () => {
      drainEventEmitted = true;
    });

    db.on('error', (err) => {
      errorEventEmitted = true;
      done(new Error(`Unexpected error: ${err.message}`));
    });

    setTimeout(() => {
      if (!drainEventEmitted) {
        done(new Error('Drain event was not emitted'));
      } else if (errorEventEmitted) {
        done(new Error('Error event was unexpectedly emitted'));
      } else {
        done();
      }
    }, 100);
  });
});