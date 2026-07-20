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
      db._writeStream?.on('error', (err: Error) => {
        db.emit('error', err);
      });
      db.set('key2', 'value2', (err: Error | null) => {
        if (err) {
          return;
        }
        // Force an error by trying to write to a file that is not writable
        fs.chmod('test.db', 0o000, (err: Error | null) => {
          if (err) {
            return;
          }
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