import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty class', () => {
  it('should emit drain event after writing to file and then emit drain again after another write with a check for the drain event and a large number of writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let drainCount = 0;

    dirty.on('load', () => {
      for (let i = 0; i < 100; i++) {
        dirty.set(`key${i}`, `value${i}`);
      }
      dirty.on('drain', () => {
        drainCount++;
      });
      setTimeout(() => {
        expect(drainCount).toBeGreaterThan(0);
        dirty.set('key101', 'value101');
        dirty.once('drain', () => {
          expect(drainCount).toBeGreaterThan(1);
          fs.unlinkSync(dbPath);
          done();
        });
      }, 100);
    });
  });
});