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
        db.close();
        fs.chmod('test.db', 0o000, (err: Error | null) => {
          if (err) return;
          db.set('key3', 'value3', () => {});
        });
      });
    });
  }, 20000);

  afterAll(() => {
    fs.chmod('test.db', 0o644, () => {
      fs.unlink('test.db', () => {});
    });
  });
});