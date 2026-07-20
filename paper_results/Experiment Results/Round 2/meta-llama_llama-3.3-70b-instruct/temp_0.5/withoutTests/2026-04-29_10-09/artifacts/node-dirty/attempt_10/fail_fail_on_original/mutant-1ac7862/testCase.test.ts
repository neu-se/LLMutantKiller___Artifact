import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should call all callbacks when setting multiple values', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      let callbackCount = 0;
      dirty.set('key1', 'value1', () => {
        callbackCount++;
      });
      dirty.set('key2', 'value2', () => {
        callbackCount++;
      });
      dirty.set('key3', 'value3', () => {
        callbackCount++;
        dirty.close();
        expect(callbackCount).toBe(3);
        fs.unlinkSync(dbPath);
        done();
      });
      // add a small delay to ensure the callbacks are not called immediately
      setTimeout(() => {
        expect(callbackCount).toBe(0);
      }, 10);
    });
  });
});