import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit error when write fails', (done) => {
    const db = new Dirty('test.db');
    db.on('error', (err: Error) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });
    db.set('key', 'value', () => {
      fs.chmod('test.db', 0o000, () => {
        db.set('key2', 'value2', () => {
          db.set('key3', 'value3', () => {});
        });
      });
    });
  });

  afterAll(() => {
    fs.unlink('test.db', () => {});
    fs.chmod('test.db', 0o644, () => {});
  });
});