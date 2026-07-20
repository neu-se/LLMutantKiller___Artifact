import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit error when write fails', (done) => {
    const db = new Dirty('test.db');
    db.on('error', (err: Error) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });
    db.set('key', 'value', (err) => {
      if (err) return;
      fs.rename('test.db', 'test2.db', (err) => {
        if (err) return;
        db.set('key2', 'value2', (err) => {
          if (err) return;
          db.set('key3', 'value3', () => {});
        });
      });
    });
  }, 10000);

  afterAll(() => {
    fs.unlink('test.db', () => {});
    fs.unlink('test2.db', () => {});
  });
});