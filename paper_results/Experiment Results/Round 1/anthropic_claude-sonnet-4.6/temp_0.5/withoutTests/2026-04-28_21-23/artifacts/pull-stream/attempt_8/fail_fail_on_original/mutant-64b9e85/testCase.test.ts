import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("does not call callback a second time with error after finding a match", () => {
    const calls: Array<[any, any]> = [];
    
    let count = 0;
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      if (count++ < 5) cb(null, count);
      else cb(true);
    }

    return new Promise<void>((resolve, reject) => {
      find(
        (x: any) => x === 2, // matches second item
        (err: any, val: any) => {
          calls.push([err, val]);
          if (calls.length === 1) {
            // First call: found the match
            expect(err).toBe(null);
            expect(val).toBe(2);
          }
          if (calls.length === 2) {
            // Second call from end callback
            // Original: null, Mutated: true
            expect(calls[1][0]).toBe(null);
            resolve();
          }
        }
      )(source);
    });
  });
});