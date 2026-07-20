import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit error when write fails', (done) => {
    const db = new Dirty('test.db');
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });
    db.set('key', 'value', () => {
      // Simulate a write error
      db._writeStream.emit('error', new Error('Write error'));
    });
  });

  afterAll(() => {
    rimraf.sync('test.db');
  });
});