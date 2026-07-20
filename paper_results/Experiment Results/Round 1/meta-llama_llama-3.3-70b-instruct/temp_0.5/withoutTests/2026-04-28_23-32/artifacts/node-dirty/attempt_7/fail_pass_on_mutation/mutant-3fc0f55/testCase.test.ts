import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty class', () => {
  it('should emit drain event after writing to file and then emit drain again after another write with multiple writes and a check for the drain event', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let drainCount = 0;

    dirty.on('load', () => {
      dirty.set('key', 'value');
      dirty.set('key2', 'value2');
      dirty.set('key3', 'value3');
      dirty.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          dirty.set('key4', 'value4');
          dirty.once('drain', () => {
            expect(drainCount).toBe(2);
            fs.unlinkSync(dbPath);
            done();
          });
        }
      });
    });
  });
});