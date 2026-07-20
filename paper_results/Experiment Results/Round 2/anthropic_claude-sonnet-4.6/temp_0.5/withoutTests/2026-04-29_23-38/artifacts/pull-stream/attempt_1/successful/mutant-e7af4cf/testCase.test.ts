import filter from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe("filter through", () => {
  it("should handle large synchronous sources without stack overflow by using iterative loop instead of recursion", (done) => {
    // Create a large array where most items are filtered out
    // This tests that the while loop is used (original) vs recursion (mutated)
    const LARGE_SIZE = 10000;
    const items = Array.from({ length: LARGE_SIZE }, (_, i) => i);
    let index = 0;

    // Synchronous pull source
    const source = (_end: any, cb: (end: any, data?: any) => void) => {
      if (index >= items.length) {
        cb(true); // end of stream
      } else {
        cb(null, items[index++]);
      }
    };

    // Filter that only passes the last item (index === LARGE_SIZE - 1)
    const filteredSource = filter((x: number) => x === LARGE_SIZE - 1)(source);

    // Collect results
    const results: number[] = [];
    
    const pull = (end: any, cb: (end: any, data?: any) => void) => {
      filteredSource(end, cb);
    };

    const drain = () => {
      pull(null, function next(end: any, data: any) {
        if (end === true) {
          // Stream ended normally
          expect(results).toEqual([LARGE_SIZE - 1]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(data);
        pull(null, next);
      });
    };

    drain();
  });
});