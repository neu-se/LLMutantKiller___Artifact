import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should behave correctly when setting a value with a callback and an error occurs', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('error', (err) => {
      fail('Should not emit error with a callback');
    });
    dirty.set('key', 'value', (err) => {
      expect(err).toBeUndefined();
      dirty.set('key2', undefined, (err) => {
        expect(err).toBeUndefined();
        fs.unlink(dbPath, () => {
          done();
        });
      });
    });
  });
});