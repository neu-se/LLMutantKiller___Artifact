import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit "drain" event when there are no in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value');
      let drainCalled = false;
      dirty.on('drain', () => {
        drainCalled = true;
        expect(drainCalled).toBe(true);
        fs.unlink(dbPath, () => {
          done();
        });
      });
      setTimeout(() => {
        if (!drainCalled) {
          throw new Error('Drain event not emitted');
        }
      }, 100);
    });
  });
});