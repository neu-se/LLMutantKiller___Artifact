import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should read values from array when abort is falsy (null/undefined)", (done) => {
    const source = values([1, 2, 3]);
    
    // Call with abort=null (falsy) - should return first value, not abort
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(1);
      done();
    });
  });
});