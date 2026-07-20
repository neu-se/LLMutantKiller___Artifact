import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit error when there are no callbacks and an error occurs', (done) => {
    const dbPath = join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.set('key', 'value', (err) => {
      expect(err).toBeNull();
      dirty.set('key', undefined, (err) => {
        expect(err).toBeNull();
        done();
      });
    });
  });
});