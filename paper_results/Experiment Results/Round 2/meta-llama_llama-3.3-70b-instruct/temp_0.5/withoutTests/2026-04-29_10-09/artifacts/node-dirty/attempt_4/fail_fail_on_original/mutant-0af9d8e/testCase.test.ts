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
      dirty.set('key2', 'value2', () => {
        dirty._inFlightWrites = 1;
        dirty.once('drain', () => {
          expect(drainCalled).toBe(false);
          fs.unlinkSync(dbPath);
          done();
        });
      });
    });
  });
});