import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event with no arguments when write stream drains', (done) => {
    const db = new Dirty(dbPath);
    let drainEventArgs: any[] = [];

    db.on('load', () => {
      // Trigger writes that will cause drain
      db.set('key1', 'value1');
      db.set('key2', 'value2');
    });

    // Listen to all events to detect if wrong event is emitted
    db.on('drain', (...args) => {
      drainEventArgs = args;
    });

    db.on('error', (err) => {
      done(new Error(`Unexpected error: ${err.message}`));
    });

    setTimeout(() => {
      // In original code: drain is emitted with no arguments
      // In mutated code: empty string is emitted as event name
      // This will cause the event to not be caught by our 'drain' listener
      if (drainEventArgs.length === 0) {
        done();
      } else {
        done(new Error('Drain event was emitted with unexpected arguments'));
      }
    }, 100);
  });
});