import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should close the file streams when there are pending writes', (done) => {
    const path = 'test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.close();
        dirty.once('drain', () => {
          expect(dirty._inFlightWrites).toBe(0);
          dirty.set('key3', 'value3', () => {
            dirty.close();
            dirty.once('drain', () => {
              expect(dirty._inFlightWrites).toBe(0);
              done();
            });
          });
        });
      });
    });
  });
});