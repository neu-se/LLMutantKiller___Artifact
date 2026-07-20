import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should emit error when there are callbacks and an error occurs in the mutated code', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      fs.unlink(dbPath, () => {
        done();
      });
    });
    dirty.set('key', 'value', () => {
      dirty._writeStream.write('invalid data', () => {});
    });
  });
});