import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty api', function () {
  it('should trigger error callback when writing to disk fails', function (done) {
    const db = new Dirty();
    db.set('key', undefined, (err: any) => {
      if (err === null) {
        done(new Error("Expected error callback to be triggered"));
      } else {
        done();
      }
    });
  });
});