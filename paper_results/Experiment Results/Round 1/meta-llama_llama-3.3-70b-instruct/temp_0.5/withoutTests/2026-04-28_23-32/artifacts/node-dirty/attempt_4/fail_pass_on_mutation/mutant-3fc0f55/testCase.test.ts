import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty class', () => {
  it('should emit drain event after writing to file and then emit drain again after another write', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value');
      let drainCount = 0;
      dirty.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          dirty.set('key2', 'value2');
        } else if (drainCount === 2) {
          expect(drainCount).toBe(2);
          fs.unlinkSync(dbPath);
          done();
        }
      });
    });
  });
});