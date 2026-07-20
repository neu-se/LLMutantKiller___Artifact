import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event after flushing the queue', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('drain', () => {
      dirty.close();
      fs.unlink('test.db', (err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    dirty.set('key1', 'value1', () => {
      dirty.set('key2', 'value2', () => {
        dirty.set('key3', 'value3', () => {
          dirty.set('key4', 'value4', () => {
            dirty.set('key5', 'value5', () => {
              // The drain event should be emitted.
            });
          });
        });
      });
    });
  });
});