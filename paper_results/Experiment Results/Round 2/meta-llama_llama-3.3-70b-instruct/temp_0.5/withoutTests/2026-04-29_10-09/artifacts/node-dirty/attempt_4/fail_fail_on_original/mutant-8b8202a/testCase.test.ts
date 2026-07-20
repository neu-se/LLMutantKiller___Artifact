import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should not emit drain event immediately when inFlightWrites is greater than 0', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        let drainEmitted = false;
        dirty.on('drain', () => {
          drainEmitted = true;
        });
        dirty.set('key2', 'value2', () => {
          dirty.set('key3', 'value3', () => {
            // Add another write to ensure inFlightWrites is greater than 0
            dirty.set('key4', 'value4', () => {
              // Ensure that drain event is not emitted immediately
              expect(drainEmitted).toBe(false);
              dirty.close();
              fs.unlink('test.db', () => {
                done();
              });
            });
          });
        });
      });
    });
  });
});