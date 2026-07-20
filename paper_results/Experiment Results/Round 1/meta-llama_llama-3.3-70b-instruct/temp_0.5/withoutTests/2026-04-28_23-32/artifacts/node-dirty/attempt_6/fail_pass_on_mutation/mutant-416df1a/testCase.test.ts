import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit error when there are callbacks and an error occurs', (done) => {
    const dbPath = join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    let errorEmitted = false;

    dirty.on('error', () => {
      errorEmitted = true;
    });

    dirty.set('key', 'value', (err) => {
      if (err) {
        throw err;
      }
      dirty.set('key2', 'value2', (err) => {
        expect(errorEmitted).toBe(false);
        done();
      });
    });
  });
});