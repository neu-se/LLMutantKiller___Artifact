import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should not emit error event when writing to disk with an error and callbacks', (done) => {
    const file = path.join(__dirname, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', (err: any) => {
        if (err) {
          done.fail('Error should not be emitted to callback');
        }
        // Simulate an error when writing to disk
        fs.writeFileSync(file, 'invalid json');
        db.set('key2', 'value2', (err: any) => {
          if (err) {
            done.fail('Error should not be emitted to callback');
          }
          let errorEmitted = false;
          db.on('error', (err: any) => {
            errorEmitted = true;
          });
          setTimeout(() => {
            if (errorEmitted) {
              expect(true).toBe(false); // This should fail on the mutated code
            } else {
              done();
            }
          }, 100);
        });
      });
    });
  });
});