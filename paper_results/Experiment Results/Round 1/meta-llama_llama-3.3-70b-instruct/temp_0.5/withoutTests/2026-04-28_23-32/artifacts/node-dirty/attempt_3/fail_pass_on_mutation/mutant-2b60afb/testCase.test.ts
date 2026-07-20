import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event after writing and then removing data', (done) => {
    const dirty = new Dirty('test.db');
    let drainCount = 0;
    dirty.on('drain', () => {
      drainCount++;
      if (drainCount === 2) {
        dirty.close();
        rimraf.sync('test.db');
        done();
      }
    });
    dirty.set('key', 'value', () => {
      dirty.set('key', undefined, () => {
        // The drain event should be emitted twice, once after writing and once after removing.
      });
    });
  });
});