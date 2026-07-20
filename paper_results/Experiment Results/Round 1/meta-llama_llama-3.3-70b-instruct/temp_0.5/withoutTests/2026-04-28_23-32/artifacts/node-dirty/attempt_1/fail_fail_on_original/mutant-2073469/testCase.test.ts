import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('emits "drain" event after writing to disk', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('drain', () => {
      rimraf('test.db', () => {
        done();
      });
    });
    dirty.set('key', 'value');
    dirty.close();
  });
});