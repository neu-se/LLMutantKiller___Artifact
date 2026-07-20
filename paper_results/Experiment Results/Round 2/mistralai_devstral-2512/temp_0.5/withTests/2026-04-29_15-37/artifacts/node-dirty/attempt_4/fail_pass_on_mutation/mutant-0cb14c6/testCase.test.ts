import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission with zero in-flight writes', () => {
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

  it('should emit drain when in-flight writes reach exactly zero', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      db.on('drain', () => {
        if (drainFired) return;
        drainFired = true;
        // Verify the drain event fires when writes complete
        // The mutant with < 0 condition will fail to emit this drain
        expect(db.get('testKey')).toBe('testValue');
        done();
      });

      // Perform a write that will complete and trigger drain
      db.set('testKey', 'testValue');
    });
  });
});