import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event with exact zero in-flight writes', () => {
  const testFile = path.join(__dirname, 'test-drain-exact.dirty');
  let db: any;

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

  it('should emit drain when in-flight writes equals zero', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify the drain event fires when writes complete
          expect(db.get('key1')).toBe('value1');
          expect(db.get('key2')).toBe('value2');

          // Force a situation where _inFlightWrites becomes exactly 0
          // The mutant with < 0 condition will fail to emit this drain
          setTimeout(() => {
            db.set('key3', 'value3');
            db.on('drain', () => {
              drainCount++;
              expect(drainCount).toBe(2);
              expect(db.get('key3')).toBe('value3');
              done();
            });
          }, 10);
        }
      });

      // Perform initial writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
    });
  });
});