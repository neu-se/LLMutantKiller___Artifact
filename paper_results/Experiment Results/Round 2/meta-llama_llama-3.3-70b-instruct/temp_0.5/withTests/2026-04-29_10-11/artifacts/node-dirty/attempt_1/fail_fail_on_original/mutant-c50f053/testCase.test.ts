import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty api', function () {
  it('should trigger error callback when writing to disk fails', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', (err) => {
        if (err) {
          done();
          return;
        }

        // Simulate a write error by making the file unwritable
        fs.chmodSync(file, 0o444);

        db.set('key2', 'value2', (err) => {
          if (err) {
            // Revert file permissions
            fs.chmodSync(file, 0o644);
            done();
          }
        });
      });
    });
  });
});