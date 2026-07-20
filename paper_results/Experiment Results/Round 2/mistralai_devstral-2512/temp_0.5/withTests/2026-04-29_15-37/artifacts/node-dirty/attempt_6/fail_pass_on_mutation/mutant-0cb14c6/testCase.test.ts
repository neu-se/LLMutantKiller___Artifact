import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event with precise write completion', () => {
  const testFile = path.join(__dirname, 'test-drain-precise.dirty');
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

  it('should emit drain when in-flight writes reaches exactly zero', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify initial writes completed
          expect(db.get('key1')).toBe('value1');
          expect(db.get('key2')).toBe('value2');

          // Perform another write that should trigger drain when complete
          db.set('key3', 'value3', () => {
            // This callback should fire before drain
            expect(db.get('key3')).toBe('value3');
          });
        } else if (drainCount === 2) {
          // This drain should occur when _inFlightWrites reaches exactly 0
          // The mutant with < 0 condition will fail to emit this drain
          expect(db.get('key3')).toBe('value3');
          done();
        }
      });

      // Perform initial writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
    });
  });
});