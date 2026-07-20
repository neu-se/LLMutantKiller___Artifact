import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should behave correctly when setting a value with a callback and an error occurs', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('error', (err: any) => {
      if (dirty._queue.size > 0) {
        fail('Should not emit error with callbacks');
      }
    });
    dirty.set('key', 'value', (err: any) => {
      expect(err).toBeNull();
      dirty.set('key2', undefined, (err: any) => {
        expect(err).toBeNull();
        dirty.set('key3', 'value3', (err: any) => {
          expect(err).toBeNull();
          fs.unlink(dbPath, () => {
            done();
          });
        });
      });
    });
  });
});