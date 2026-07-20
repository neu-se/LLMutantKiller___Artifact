import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event after writing multiple times', (done) => {
    const dirty = new Dirty('test.db');
    let count = 0;
    dirty.on('drain', () => {
      count++;
      if (count === 3) {
        dirty.close();
        rimraf.sync('test.db');
        done();
      }
    });
    dirty.set('key1', 'value1', () => {
      dirty.set('key2', 'value2', () => {
        dirty.set('key3', 'value3', () => {
          // The drain event should be emitted after each write.
        });
      });
    });
  });
});