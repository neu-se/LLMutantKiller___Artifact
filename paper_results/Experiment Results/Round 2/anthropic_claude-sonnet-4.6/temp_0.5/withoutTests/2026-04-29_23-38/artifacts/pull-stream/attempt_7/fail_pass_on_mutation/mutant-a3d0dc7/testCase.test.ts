import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"
import abortCb from "../../../../../../../../../../../subject_repositories/pull-stream/util/abort-cb.js"

describe("values source", () => {
  it("should return undefined in mutated code because abortCb causes early return", (done) => {
    const source = values([1, 2, 3]);
    
    // If mutated, source is undefined because abortCb returns early
    // If original, source is a function
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(1);
      done();
    });
  });
});