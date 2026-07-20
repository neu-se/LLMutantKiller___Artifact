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

  it('should emit drain event with correct event name when write stream drains', (done) => {
    const db = new Dirty(dbPath);
    let drainEventReceived = false;
    let errorEventReceived = false;

    db.on('load', () => {
      // Trigger writes that will cause drain
      db.set('key1', 'value1');
      db.set('key2', 'value2');
    });

    // Listen for drain event
    db.on('drain', () => {
      drainEventReceived = true;
    });

    // Listen for error events
    db.on('error', () => {
      errorEventReceived = true;
    });

    setTimeout(() => {
      // In original code: drain event should be received
      // In mutated code: empty string event is emitted which won't trigger our listener
      if (drainEventReceived && !errorEventReceived) {
        done();
      } else {
        done(new Error('Drain event was not properly emitted'));
      }
    }, 100);
  });
});