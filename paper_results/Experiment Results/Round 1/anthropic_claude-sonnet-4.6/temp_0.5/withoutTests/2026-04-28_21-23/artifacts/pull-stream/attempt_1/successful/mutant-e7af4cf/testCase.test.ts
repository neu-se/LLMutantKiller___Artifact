import filter from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe("filter through - synchronous loop optimization", () => {
  it("should handle large numbers of synchronously filtered items without stack overflow", (done) => {
    // Create a large array where only the last element passes the filter
    const COUNT = 10000;
    const items: number[] = [];
    for (let i = 0; i < COUNT - 1; i++) {
      items.push(0); // These will be filtered out
    }
    items.push(1); // Only this passes

    let index = 0;

    // Synchronous source
    const source = (_end: any, cb: (end: any, data?: any) => void) => {
      if (_end) {
        cb(_end, null);
        return;
      }
      if (index >= items.length) {
        cb(true, null); // End of stream
        return;
      }
      cb(null, items[index++]); // Synchronous callback
    };

    // Filter: only pass items === 1
    const filtered = filter((x: number) => x === 1)(source);

    const results: number[] = [];

    const pull = (end: any, cb: (end: any, data?: any) => void) => {
      filtered(end, function next(end: any, data: any) {
        if (end === true) {
          cb(true, null);
          return;
        }
        if (end) {
          cb(end, null);
          return;
        }
        results.push(data);
        filtered(null, next);
      });
    };

    // This should complete without stack overflow in original, but may overflow in mutated
    try {
      pull(null, (end: any) => {
        if (end === true) {
          expect(results).toEqual([1]);
          done();
        } else if (end) {
          done(end);
        }
      });
    } catch (e) {
      done(e);
    }
  });
});