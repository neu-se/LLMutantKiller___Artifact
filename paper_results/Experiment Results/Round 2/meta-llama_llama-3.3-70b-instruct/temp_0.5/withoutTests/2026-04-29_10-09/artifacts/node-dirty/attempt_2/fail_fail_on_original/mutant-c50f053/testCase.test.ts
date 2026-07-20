import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit error when writing to a non-existent file and then trying to write again', (done) => {
    const db = new Dirty('test.db');
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });
    db.set('key', 'value', (err) => {
      if (err) {
        db.set('key2', 'value2', () => {});
      }
    });
    fs.unlink('test.db', () => {
      fs.appendFile('test.db', 'corrupted data', () => {});
    });
  });

  afterAll(() => {
    fs.unlink('test.db', () => {});
  });
});