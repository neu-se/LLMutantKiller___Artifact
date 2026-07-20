import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap with no map function", () => {
  it("should return identity function that passes through values when no map is provided", (done) => {
    // When no map function is provided, asyncMap should return the identity function
    // The identity function should return the through-stream unchanged (i.e., return `e`)
    // In the mutated version, `id` returns undefined instead of `e`
    
    const through = asyncMap(null);
    
    // The identity function should return the read function itself (passthrough)
    // Create a simple source that emits one value then ends
    const values = [1, 2, 3];
    let index = 0;
    
    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      if (index >= values.length) {
        cb(true);
        return;
      }
      cb(null, values[index++]);
    }
    
    // When asyncMap(null) is called, it should return `id` which is `function(e) { return e }`
    // So `through(source)` should return `source` itself (identity)
    const result = through(source);
    
    // In the original: id returns e, so through(source) === source
    // In the mutated: id returns undefined, so through(source) === undefined
    
    if (result === undefined) {
      done(new Error("Expected through to return a function, but got undefined"));
      return;
    }
    
    // Verify the result is callable and works as a passthrough
    const collected: number[] = [];
    
    function drain() {
      result(null, (end: any, data?: any) => {
        if (end === true) {
          // Stream ended normally
          try {
            expect(collected).toEqual([1, 2, 3]);
            done();
          } catch (e) {
            done(e);
          }
          return;
        }
        if (end) {
          done(end);
          return;
        }
        collected.push(data);
        drain();
      });
    }
    
    drain();
  });
});