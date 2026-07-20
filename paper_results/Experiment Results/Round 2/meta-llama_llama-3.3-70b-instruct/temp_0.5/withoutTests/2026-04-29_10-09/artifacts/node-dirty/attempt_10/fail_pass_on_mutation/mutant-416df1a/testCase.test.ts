import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should behave correctly when setting a value with a callback and no error occurs', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    let callbackCalled = false;
    dirty.set('key', 'value', (err: any) => {
      expect(err).toBeNull();
      callbackCalled = true;
      fs.unlink(dbPath, () => {
        expect(callbackCalled).toBeTruthy();
        done();
      });
    });
  });
});