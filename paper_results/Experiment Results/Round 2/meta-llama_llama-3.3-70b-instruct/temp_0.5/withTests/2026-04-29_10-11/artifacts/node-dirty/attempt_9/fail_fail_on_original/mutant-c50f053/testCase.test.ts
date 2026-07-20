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
      db.set('key2', undefined, (err: any) => {
        if (err === null) {
          db.on('error', (err: any) => {
            done(new Error("Expected error callback to be triggered"));
          });
          db.set('key3', 'value3', (err: any) => {
            if (err) {
              done();
            }
          });
        } else {
          done();
        }
      });
    });
  }, 10000);
});