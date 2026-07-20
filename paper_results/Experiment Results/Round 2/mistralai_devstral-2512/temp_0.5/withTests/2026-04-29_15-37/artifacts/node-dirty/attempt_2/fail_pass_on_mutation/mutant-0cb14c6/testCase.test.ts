import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission with multiple writes', () => {
  const testFile = path.join(__dirname, 'test-drain-multi.dirty');
  let db: Dirty;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should emit drain when in-flight writes reach zero', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify that drain was emitted when _inFlightWrites reached exactly 0
          // This should happen after the first batch of writes completes
          expect(db.get('key1')).toBe('value1');
          expect(db.get('key2')).toBe('value2');
          expect(db.get('key3')).toBe('value3');
          done();
        }
      });

      // Perform multiple writes that will batch together
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');
    });
  });
});