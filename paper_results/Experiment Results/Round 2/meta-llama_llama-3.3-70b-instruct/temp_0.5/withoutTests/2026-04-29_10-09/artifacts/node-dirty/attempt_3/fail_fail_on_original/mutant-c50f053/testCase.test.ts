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
      if (err) {
        return;
      }
      // Simulate a write error
      const originalWrite = db._writeStream.write;
      db._writeStream.write = (data: any, cb: (err: Error | null) => void) => {
        cb(new Error('Write error'));
      };
      db.set('key2', 'value2', () => {});
      db._writeStream.write = originalWrite;
    });
  });

  afterAll(() => {
    fs.unlink('test.db', () => {});
  });
});