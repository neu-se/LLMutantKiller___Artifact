import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty class', () => {
  it('should emit drain event after writing to file and then emit drain again after another write with a check for the drain event, a timeout, and multiple writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let drainCount = 0;

    dirty.on('load', () => {
      dirty.set('key', 'value');
      dirty.set('key2', 'value2');
      dirty.set('key3', 'value3');
      dirty.on('drain', () => {
        drainCount++;
      });
      setTimeout(() => {
        dirty.set('key4', 'value4');
        dirty.set('key5', 'value5');
        dirty.set('key6', 'value6');
        dirty.set('key7', 'value7');
        expect(drainCount).toBe(1);
        dirty.once('drain', () => {
          expect(drainCount).toBe(2);
          fs.unlinkSync(dbPath);
          done();
        });
      }, 100);
    });
  });
});