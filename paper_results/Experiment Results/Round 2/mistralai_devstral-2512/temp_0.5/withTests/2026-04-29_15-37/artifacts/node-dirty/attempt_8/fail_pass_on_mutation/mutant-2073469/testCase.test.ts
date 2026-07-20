import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission test', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event with correct event name when write stream drains', (done) => {
    db = new Dirty(testFile);
    let drainEventFired = false;
    let emptyEventFired = false;

    db.on('load', () => {
      // Set up listener for drain event
      db.on('drain', () => {
        drainEventFired = true;
      });

      // Set up listener for empty string event (should never fire in original)
      db.on('', () => {
        emptyEventFired = true;
      });

      // Trigger a write operation
      db.set('testKey', 'testValue');

      // Check after a short delay
      setTimeout(() => {
        expect(drainEventFired).toBe(true);
        expect(emptyEventFired).toBe(false);
        done();
      }, 100);
    });
  });
});