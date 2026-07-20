import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit error when write fails', (done) => {
    const db = new Dirty('test.db');
    db.on('error', (err: Error) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });
    db.set('key', 'value', (err: Error | null) => {
      if (err) return;
      db.set('key2', 'value2', (err: Error | null) => {
        if (err) return;
        fs.unlink('test.db', () => {
          db.set('key3', 'value3', () => {});
        });
      });
    });
  }, 10000);

  afterAll(() => {
    fs.mkdir('test.db', (err) => {
      if (err) return;
      fs.rmdir('test.db', () => {});
    });
  });
});