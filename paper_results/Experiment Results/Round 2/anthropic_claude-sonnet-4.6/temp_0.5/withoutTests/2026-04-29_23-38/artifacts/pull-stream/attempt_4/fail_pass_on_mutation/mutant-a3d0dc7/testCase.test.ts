import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should call callback with null error and value when reading from array with no abort", (done) => {
    const source = values([42, 43, 44]);
    
    // Pass abort=null (falsy) - original code skips the early abort check and proceeds normally
    // Mutated code always calls abortCb regardless, so cb would be called with an error
    source(null, (err: any, val: any) => {
      if (err) {
        // In mutated code, abortCb is called with abort=null, which calls cb(null) - end of stream
        // So we need to check that we actually got a value
        done(new Error(`Expected a value but got err=${err}`));
      } else {
        expect(val).toBe(42);
        done();
      }
    });
  });
});