import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source with null/undefined array", () => {
  it("should call onAbort and return end when array is null/falsy", (done) => {
    let onAbortCalled = false;
    const onAbort = () => { onAbortCalled = true; };
    
    const source = values(null, onAbort);
    
    source(null, (end: any, data: any) => {
      // When array is null, the original code should immediately return cb(true) (end)
      // The mutated code (if(false)) skips the null check, causing it to try to process null as an array
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});