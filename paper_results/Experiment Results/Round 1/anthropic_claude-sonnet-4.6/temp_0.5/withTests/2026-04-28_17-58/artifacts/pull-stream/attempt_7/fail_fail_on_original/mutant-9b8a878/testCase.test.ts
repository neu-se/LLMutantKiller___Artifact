import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should handle source with length !== 1 correctly without taking partial sink path", (done) => {
    const results: number[] = [];
    
    // Source function with length !== 1 (2 params) - should NOT take partial path
    const source = function(abort: any, cb: Function) {
      let i = 0;
      return (abort: any, cb: Function) => {
        if (abort || i >= 3) return cb(true);
        cb(null, ++i);
      };
    };
    
    // This should work normally
    const read = pull(source(null, () => {}));
    read(null, (end: any, data: number) => {
      if (!end) results.push(data);
      if (results.length === 3) {
        expect(results).toEqual([1, 2, 3]);
        done();
      }
    });
  });
});