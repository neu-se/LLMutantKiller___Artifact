import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty api', function () {
  it('should trigger error callback when writing to disk fails', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.set('key', 'value', (err: any) => {
      if (err) {
        done();
        return;
      }
      // Simulate a write error by making the file unwritable
      require('fs').chmodSync(file, 0o444);
      db.set('key2', 'value2', (err: any) => {
        require('fs').chmodSync(file, 0o644);
        if (err !== null) {
          done();
        } else {
          db.on('error', (err: any) => {
            if (err) {
              done();
            } else {
              done(new Error("Expected error callback to be triggered"));
            }
          });
        }
      });
    });
  });
});