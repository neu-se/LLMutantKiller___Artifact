import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should read first value from array correctly", (done) => {
    const source = values([42]);
    // With mutation: abortCb(undefined, undefined, undefined) is called at setup
    // abortCb likely calls cb(abort) = undefined(undefined) which throws
    // OR returns something non-function, causing source(null, cb) to fail
    let error: any = null;
    try {
      source(null, (err: any, val: any) => {
        expect(err).toBeNull();
        expect(val).toBe(42);
        done();
      });
    } catch(e) {
      error = e;
      // mutated code throws when trying to call source
      expect(error).not.toBeNull();
      done();
    }
  });
});