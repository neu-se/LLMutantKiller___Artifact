import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission with exact zero condition', () => {
  const testFile = path.join(__dirname, 'test-drain-exact-zero.dirty');
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

  it('should emit drain when in-flight writes equals exactly zero', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      const expectedDrainCount = 2;

      db.on('drain', () => {
        drainCount++;

        if (drainCount === expectedDrainCount) {
          // This drain should occur when _inFlightWrites reaches exactly 0
          // The mutant with < 0 condition will fail to emit this drain
          expect(db.get('key1')).toBe('value1');
          expect(db.get('key2')).toBe('value2');
          expect(db.get('key3')).toBe('value3');
          expect(db.get('key4')).toBe('value4');
          done();
        } else if (drainCount === 1) {
          // First drain after initial writes
          db.set('key3', 'value3');
          db.set('key4', 'value4');
        }
      });

      // Initial writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
    });
  });
});