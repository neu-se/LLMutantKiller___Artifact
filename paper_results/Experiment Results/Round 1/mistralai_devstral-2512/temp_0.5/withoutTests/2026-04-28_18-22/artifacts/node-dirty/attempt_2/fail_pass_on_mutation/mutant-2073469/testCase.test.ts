import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event emission', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event with correct event name when writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainEventReceived = false;

    db.on('load', () => {
      // Write data to trigger the drain event
      db.set('testKey', { test: 'data' }, () => {
        // This should trigger the drain event
      });
    });

    // Listen for both possible events to detect the mutation
    db.on('drain', () => {
      drainEventReceived = true;
    });

    db.on('', () => {
      // If this is triggered, we know the mutation is present
      done(new Error('Received empty string event instead of drain event'));
    });

    // Set a timeout to verify the test completes
    setTimeout(() => {
      if (drainEventReceived) {
        db.close();
        done();
      } else {
        done(new Error('drain event was not emitted'));
      }
    }, 100);
  });
});