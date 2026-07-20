import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should not emit drain event immediately after setting a value', (done) => {
    const dirty = new Dirty('test.db');
    let drainEmitted = false;
    dirty.on('load', () => {
      dirty.on('drain', () => {
        drainEmitted = true;
      });
      dirty.set('key', 'value');
      expect(drainEmitted).toBe(false);
      dirty.set('key2', 'value2', () => {
        dirty.close();
        fs.unlink('test.db', () => {
          done();
        });
      });
    });
  });
});