import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event after flushing the queue', (done) => {
    const dirty = new Dirty('test.db');
    dirty.set('key1', 'value1', () => {
      dirty.set('key2', 'value2', () => {
        dirty.set('key3', 'value3', () => {
          dirty._writeStream.on('drain', () => {
            // In the mutated code, this event will not be triggered
            // because the condition to call _flush is always false.
            dirty.close();
            rimraf.sync('test.db');
            done();
          });
        });
      });
    });
  });
});