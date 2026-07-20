import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty class', () => {
  it('should emit drain event after writing to file and then emit drain again after another write with a timeout', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let drainCount = 0;

    dirty.on('load', () => {
      dirty.set('key', 'value');
      dirty.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          dirty.set('key2', 'value2');
        }
      });
    });

    setTimeout(() => {
      expect(drainCount).toBe(2);
      fs.unlinkSync(dbPath);
      done();
    }, 100);
  });
});