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
    let drainReceived = false;
    let emptyEventReceived = false;

    db.on('load', () => {
      // Write data to trigger the drain event
      db.set('testKey', { test: 'data' }, () => {
        // This callback should be triggered
      });
    });

    db.on('drain', () => {
      drainReceived = true;
    });

    // The mutation changes the event name to empty string
    // We need to explicitly check for this
    const originalOn = db.on;
    let emptyListenerAdded = false;
    db.on = function(event: string, listener: Function) {
      if (event === '') {
        emptyListenerAdded = true;
        return originalOn.call(this, event, () => {
          emptyEventReceived = true;
        });
      }
      return originalOn.call(this, event, listener);
    };

    setTimeout(() => {
      try {
        expect(drainReceived).toBe(true);
        expect(emptyEventReceived).toBe(false);
        db.close();
        done();
      } catch (error) {
        done(error);
      }
    }, 200);
  });
});