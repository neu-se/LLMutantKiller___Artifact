import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream drain behavior', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should emit drain event when write stream drains with empty queue', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a large value to trigger drain
      const largeValue = 'x'.repeat(10000);
      db.set('key1', largeValue);

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Queue should be empty now
          // In original code, this should trigger _flush() which would emit another drain
          // In mutated code, _flush() won't be called
          setImmediate(() => {
            if (drainCount >= 2) {
              done();
            } else {
              done(new Error('Expected second drain event when queue is empty'));
            }
          });
        }
      });
    });
  });
});