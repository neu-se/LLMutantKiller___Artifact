import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should not emit error when there are callbacks and an error occurs', (done) => {
    const dbPath = join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    let errorEmitted = false;

    dirty.on('error', () => {
      errorEmitted = true;
    });

    dirty._writeStream = {
      write: () => {
        return false;
      }
    };

    dirty.set('key', 'value', () => {
      expect(errorEmitted).toBe(false);
      done();
    });
  });
});