import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should close the db file streams correctly when there are pending writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.close();
        setTimeout(() => {
          try {
            dirty.set('key3', 'value3');
            expect(true).toBe(false); // This should not be called
          } catch (e) {
            expect(e).toBeInstanceOf(Error);
            done();
          }
        }, 100);
      });
    });
  });
});