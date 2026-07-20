import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event with zero in-flight writes', () => {
  const testFile = path.join(__dirname, 'test-drain-zero.dirty');
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

  it('should emit drain when in-flight writes reaches zero', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      db.on('drain', () => {
        if (drainFired) return;
        drainFired = true;

        // Verify the drain event fires when writes complete
        expect(db.get('key1')).toBe('value1');
        expect(db.get('key2')).toBe('value2');
        expect(db.get('key3')).toBe('value3');

        // The mutant with < 0 condition will fail to emit this drain
        // because _inFlightWrites will be exactly 0, not less than 0
        done();
      });

      // Perform multiple writes that will complete
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');
    });
  });
});