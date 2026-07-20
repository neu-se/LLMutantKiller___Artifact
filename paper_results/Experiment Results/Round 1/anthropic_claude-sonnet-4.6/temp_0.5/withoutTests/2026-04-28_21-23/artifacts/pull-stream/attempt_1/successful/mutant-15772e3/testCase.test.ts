import filter from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe("filter through - async source with filtered items", () => {
  it("should correctly filter items from an async source and call callback", (done) => {
    // Create an async source that yields values with a setImmediate delay
    const values = [1, 2, 3, 4, 5];
    let index = 0;

    const asyncSource = (_end: any, cb: (end: any, data?: any) => void) => {
      if (index >= values.length) {
        cb(true); // end of stream
        return;
      }
      const value = values[index++];
      // Make the source async
      setImmediate(() => {
        cb(null, value);
      });
    };

    // Filter to only pass even numbers
    // This means odd numbers (1, 3, 5) will be filtered out
    // When source is async and item is filtered, the mutated code will hang
    const filteredSource = filter((x: number) => x % 2 === 0)(asyncSource);

    const results: number[] = [];

    function pull() {
      filteredSource(null, (end: any, data?: any) => {
        if (end === true) {
          // Stream ended
          expect(results).toEqual([2, 4]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(data);
        pull();
      });
    }

    pull();

    // Add a timeout to detect if the stream hangs (mutation would cause this)
    // Jest's default timeout should handle this, but we set a reasonable expectation
  }, 3000);
});