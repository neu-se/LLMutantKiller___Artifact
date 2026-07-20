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
    let drainEventCount = 0;
    let emptyEventCount = 0;

    db.on('load', () => {
      // Set up listener for drain event
      db.on('drain', () => {
        drainEventCount++;
      });

      // Set up listener for empty string event (should never fire in original)
      db.on('', () => {
        emptyEventCount++;
      });

      // Trigger multiple write operations to ensure drain is called
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Check after a short delay
      setTimeout(() => {
        expect(drainEventCount).toBeGreaterThan(0);
        expect(emptyEventCount).toBe(0);
        done();
      }, 200);
    });
  });
});