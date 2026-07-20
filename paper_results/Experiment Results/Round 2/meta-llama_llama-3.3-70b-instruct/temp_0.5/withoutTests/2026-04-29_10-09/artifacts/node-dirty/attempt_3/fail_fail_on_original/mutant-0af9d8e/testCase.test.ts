import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should not emit drain when there are in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let drainCalled = false;

    dirty.on('drain', () => {
      drainCalled = true;
    });

    dirty.set('key', 'value', () => {
      dirty._inFlightWrites = 1;
      if (dirty._writeStream) {
        dirty._writeStream.on('drain', () => {
          expect(drainCalled).toBe(false);
          fs.unlinkSync(dbPath);
          done();
        });
        dirty._writeStream.emit('drain');
      } else {
        expect(drainCalled).toBe(false);
        fs.unlinkSync(dbPath);
        done();
      }
    });
  });
});