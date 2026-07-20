import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('drain', () => {
      dirty.close();
      rimraf('test.db', () => {
        done();
      });
    });
    dirty.set('key', 'value', () => {
      // No-op
    });
  });
});