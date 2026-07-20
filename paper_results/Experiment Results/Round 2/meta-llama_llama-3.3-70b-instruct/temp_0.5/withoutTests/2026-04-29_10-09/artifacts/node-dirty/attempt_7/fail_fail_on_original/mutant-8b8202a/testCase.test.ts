import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should not emit drain event when inFlightWrites is greater than 0 and then emit drain event when inFlightWrites is 0', (done) => {
    const dirty = new Dirty('test.db');
    let drainEmitted = false;
    dirty.on('load', () => {
      dirty.on('drain', () => {
        drainEmitted = true;
      });
      dirty.set('key', 'value');
      expect(drainEmitted).toBe(false);
      dirty.set('key2', 'value2', () => {
        expect(drainEmitted).toBe(false);
        dirty.close();
        expect(drainEmitted).toBe(true);
        fs.unlink('test.db', () => {
          done();
        });
      });
    });
  });
});