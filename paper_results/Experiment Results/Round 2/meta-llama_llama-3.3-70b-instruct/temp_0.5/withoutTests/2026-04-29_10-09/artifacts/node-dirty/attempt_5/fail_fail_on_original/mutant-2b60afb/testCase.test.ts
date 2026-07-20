import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const path = 'test.db';
    fs.writeFileSync(path, '');
    const dirty = new Dirty(path);

    let loadCalled = false;
    dirty.on('load', () => {
      loadCalled = true;
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          dirty.close();
          fs.unlinkSync(path);
          expect(loadCalled).toBe(true);
          expect(dirty._inFlightWrites).toBe(0);
          done();
        });
      });
    });
    setTimeout(() => {
      if (!loadCalled) {
        done.fail('load event was not emitted');
      }
    }, 1000);
  });
});