import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event when inFlightWrites is 0', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        let drainEmitted = false;
        dirty.on('drain', () => {
          drainEmitted = true;
        });
        dirty.set('key2', 'value2', () => {
          dirty.set('key3', 'value3', () => {
            // Ensure that drain event is emitted when inFlightWrites is 0
            dirty.close();
            expect(drainEmitted).toBe(true);
            fs.unlink('test.db', () => {
              done();
            });
          });
        });
      });
    });
  });
});