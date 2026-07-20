import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event when inFlightWrites is less than or equal to 0', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          dirty.close();
          fs.exists('test.db', (exists) => {
            if (exists) {
              rimraf('test.db', () => {
                done();
              });
            } else {
              done();
            }
          });
        });
      });
    });
  });
});