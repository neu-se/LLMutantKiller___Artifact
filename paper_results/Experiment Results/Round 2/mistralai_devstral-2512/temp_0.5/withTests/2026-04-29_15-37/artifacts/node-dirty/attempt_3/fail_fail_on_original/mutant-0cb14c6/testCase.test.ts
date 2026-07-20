import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event with write buffer backpressure', () => {
  const testFile = path.join(__dirname, 'test-drain-pressure.dirty');
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

  it('should emit drain when writes complete after backpressure', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // First drain after initial writes
          expect(db.get('key1')).toBe('value1');
          // Force another write that will trigger backpressure
          db.set('key2', 'value2');
          db.on('drain', () => {
            drainCount++;
            if (drainCount === 2) {
              // This drain should occur when _inFlightWrites reaches exactly 0
              // The mutant with < 0 condition will fail to emit this drain
              expect(db.get('key2')).toBe('value2');
              done();
            }
          });
        }
      });

      // First write
      db.set('key1', 'value1');
    });
  });
});