import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should abort stream when abort signal is sent", (done) => {
    const source = values([1, 2, 3]);
    // Send abort=true to the source
    // Original: if(abort) fires -> abortCb called -> onAbort called, cb called with error
    // Mutated: if(true) fires -> same behavior when abort=true
    // But when abort=null (normal read):
    // Original: skips abort check, reads value
    // Mutated: if(true) fires -> abortCb(cb, null, onAbort) called
    //   abortCb with null abort: calls cb(null) synchronously without a value
    //   so val would be undefined, not 1
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).not.toBeUndefined();
      done();
    });
  });
});