import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error event when a write operation fails', (done) => {
    const file = path.join(__dirname, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', (err: any) => {
        if (err) {
          throw err;
        }
        db.set('key2', 'value2', (err: any) => {
          if (err) {
            db.on('error', (err: any) => {
              done();
            });
          } else {
            // On the original code, an error should be emitted when a write operation fails.
            // However, on the mutated code, no error is emitted.
            // So, we expect the test to pass on the original code and fail on the mutated code.
            db.on('error', () => {
              done.fail('No error emitted');
            });
            // Simulate a write error
            db._writeStream.destroy();
          }
        });
      });
    });
  });
});