import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should return actual values from a plain array without aborting", (done) => {
    const source = values([10, 20, 30]);
    // First call: abort=null means "read next value"
    // Original: skips the early abort check (abort is null/falsy), processes array, returns val=10
    // Mutated: if(true) always fires, calls abortCb(cb, null, onAbort)
    //          abortCb with null abort calls cb(null) with no second argument -> val is undefined
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(10);
      done();
    });
  });
});