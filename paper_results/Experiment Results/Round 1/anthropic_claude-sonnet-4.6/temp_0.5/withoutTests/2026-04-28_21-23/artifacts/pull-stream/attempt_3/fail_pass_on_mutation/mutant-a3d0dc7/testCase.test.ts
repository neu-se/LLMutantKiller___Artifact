import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should deliver values when called with null abort before array is converted", (done) => {
    // Pass a non-array object so it goes through the Object.keys conversion path
    // With mutation, if(true) fires before conversion, calling abortCb(cb, null, onAbort)
    // abortCb with null abort will call cb(null) which ends the stream differently
    const obj = { a: 1, b: 2 };
    const source = values(obj);
    source(null, (err: any, val: any) => {
      // Original: err should be null, val should be 1 (first value)
      // Mutated: abortCb(cb, null, onAbort) is called - abortCb with falsy abort calls cb(null) with no value
      expect(err).toBeNull();
      expect(val).toBe(1);
      done();
    });
  });
});