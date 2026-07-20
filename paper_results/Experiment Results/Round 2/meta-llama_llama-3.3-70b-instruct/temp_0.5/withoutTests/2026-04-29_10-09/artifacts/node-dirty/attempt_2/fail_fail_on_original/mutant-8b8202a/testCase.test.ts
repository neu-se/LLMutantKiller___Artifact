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
          setTimeout(() => {
            expect(drainEmitted).toBe(false);
            dirty.close();
            fs.unlink('test.db', () => {
              done();
            });
          }, 10);
        });
      });
    });
  });
});