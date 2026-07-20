import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const path = 'test.db';
    fs.writeFileSync(path, '');
    const dirty = new Dirty(path);

    let drainCalled = false;
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          drainCalled = true;
          dirty.close();
          fs.unlinkSync(path);
          expect(drainCalled).toBe(true);
          done();
        });
      });
    });
    setTimeout(() => {
      if (!drainCalled) {
        dirty.close();
        fs.unlinkSync(path);
        done.fail(new Error('drain event was not emitted'));
      }
    }, 1000);
  });
});