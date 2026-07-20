import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const path = 'test.db';
    fs.writeFileSync(path, '');
    const dirty = new Dirty(path);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          dirty.close();
          fs.unlinkSync(path);
          done();
        });
        setTimeout(() => {
          if (dirty._queue.size === 0) {
            expect(dirty._inFlightWrites).toBe(0);
            done();
          }
        }, 100);
      });
    });
  });
});