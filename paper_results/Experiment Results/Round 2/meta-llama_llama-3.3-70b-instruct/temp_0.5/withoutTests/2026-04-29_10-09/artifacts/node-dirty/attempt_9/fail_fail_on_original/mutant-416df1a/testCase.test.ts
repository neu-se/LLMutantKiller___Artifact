import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should behave correctly when setting a value with a callback and an error occurs', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let errorEmitted = false;
    dirty.on('error', (err: any) => {
      errorEmitted = true;
    });
    dirty.set('key', 'value', () => {
      dirty.set('key2', undefined, () => {
        dirty.set('key3', 'value3', () => {
          expect(errorEmitted).toBeFalsy();
          fs.unlink(dbPath, () => {
            done();
          });
        });
      });
    });
    // Introduce an error
    dirty._writeStream.emit('error', new Error('Test error'));
  });
});