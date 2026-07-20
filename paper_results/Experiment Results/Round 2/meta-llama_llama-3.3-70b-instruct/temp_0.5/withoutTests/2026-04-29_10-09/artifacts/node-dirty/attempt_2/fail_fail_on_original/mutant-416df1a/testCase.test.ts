import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not emit error when there are callbacks and an error occurs', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('error', (err) => {
      fail('Should not emit error');
    });
    dirty.set('key', 'value', (err) => {
      expect(err).toBeUndefined();
      fs.unlink(dbPath, () => {
        done();
      });
    });
    dirty._writeStream.write('invalid data', (err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });
});