import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error event when a write operation fails', (done) => {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', (err: any) => {
        if (err) {
          throw err;
        }
        db.set('key2', 'value2', (err: any) => {
          if (err) {
            throw err;
          }
          // Simulate a write error by closing the write stream
          db._writeStream.destroy();
          // On the original code, an error should be emitted when a write operation fails.
          // However, on the mutated code, no error is emitted.
          db.on('error', (err: any) => {
            expect(err).not.toBeNull();
            done();
          });
          // Set another key to trigger the error
          db.set('key3', 'value3', () => {});
        });
      });
    });
  });
});