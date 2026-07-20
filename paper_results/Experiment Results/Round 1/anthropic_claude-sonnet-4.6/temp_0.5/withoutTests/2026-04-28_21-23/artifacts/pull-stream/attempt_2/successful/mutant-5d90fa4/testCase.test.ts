import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source with null/undefined array", () => {
  it("should immediately end when array is null", (done) => {
    const source = values(null, undefined);
    
    source(null, (end: any, data: any) => {
      // When array is null, the original code checks `if(!array)` and returns cb(true) (end signal)
      // The mutated code uses `if(false)` which skips this check, causing it to try to process null
      expect(end).toBe(true);
      done();
    });
  });
});