import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should emit error event when writing to disk with an error and no callbacks', (done) => {
    const file = path.join(__dirname, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      // Simulate an error when writing to disk
      fs.writeFileSync(file, 'invalid json');
      db.set('key2', 'value2');
      let errorEmitted = false;
      db.on('error', (err: any) => {
        errorEmitted = true;
      });
      setTimeout(() => {
        if (errorEmitted) {
          done();
        } else {
          expect(true).toBe(false);
          done();
        }
      }, 100);
    });
  });
});