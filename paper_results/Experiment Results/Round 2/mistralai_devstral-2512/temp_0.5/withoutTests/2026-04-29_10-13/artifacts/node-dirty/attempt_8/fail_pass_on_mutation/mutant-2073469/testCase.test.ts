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

  it('should emit drain event with correct event name when write stream drains', (done) => {
    const db = new Dirty(dbPath);
    let drainEventReceived = false;
    let unexpectedEventReceived = false;

    db.on('load', () => {
      // Trigger writes that will cause drain
      db.set('key1', 'value1');
      db.set('key2', 'value2');
    });

    // Listen for drain event
    db.on('drain', () => {
      drainEventReceived = true;
    });

    // Listen for all events to catch unexpected ones
    db.on('newListener', (eventName) => {
      if (eventName === '') {
        unexpectedEventReceived = true;
      }
    });

    setTimeout(() => {
      // In original code: only drain event should be received
      // In mutated code: empty string event will be detected
      if (drainEventReceived && !unexpectedEventReceived) {
        done();
      } else {
        done(new Error('Unexpected event emission detected'));
      }
    }, 100);
  });
});