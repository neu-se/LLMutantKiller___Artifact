import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event only once when multiple writes are done', (done) => {
    const dirty = new Dirty('test.db');
    let drainCount = 0;
    dirty.on('load', () => {
      dirty.on('drain', () => {
        drainCount++;
      });
      dirty.set('key', 'value');
      dirty.set('key2', 'value2');
      dirty.set('key3', 'value3', () => {
        dirty.close();
        expect(drainCount).toBe(1);
        fs.unlink('test.db', () => {
          done();
        });
      });
    });
  });
});