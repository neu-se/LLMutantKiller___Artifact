import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should not abort when abort is false/null and array is provided", (done) => {
    const array = [10, 20, 30];
    const source = values(array);
    
    // In the original code, the early abort check only triggers when abort is truthy
    // In the mutated code, `if(true)` always calls abortCb, so we never get values
    let callCount = 0;
    
    source(false, (err: any, val: any) => {
      callCount++;
      // Should receive first value without error
      expect(err).toBeNull();
      expect(val).toBe(10);
      expect(callCount).toBe(1);
      done();
    });
  });
});