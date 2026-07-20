import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  it('should emit drain event when queue is empty after write stream drains', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure we have writes in flight
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Wait for drain event
      db.on('drain', () => {
        // Verify data was written
        const data = fs.readFileSync(testFile, 'utf-8');
        const lines = data.trim().split('\n');
        expect(lines.length).toBe(2);

        // Verify the drain event was properly emitted
        // This test will fail on the mutated code because the empty else block
        // won't properly trigger the _flush() call when queue is empty
        done();
      });
    });
  });
});