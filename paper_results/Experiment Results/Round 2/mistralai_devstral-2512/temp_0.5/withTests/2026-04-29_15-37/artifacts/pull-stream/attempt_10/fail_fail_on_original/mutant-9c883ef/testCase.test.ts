const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe("find callback behavior", () => {
  it("should handle callback parameter correctly when cb is not provided", () => {
    // Test the specific behavior affected by the mutation
    // In the original code, when cb is falsy, it should swap cb and test
    // In the mutated code (if(false)), this swap never happens

    // Create a mock test function
    const testFn = (d: number) => d > 2;

    // Call find without a callback
    const stream = find(testFn);

    // In the original code, since no cb was provided:
    // - cb becomes testFn
    // - test becomes id (identity function)
    // So the stream should use identity function for testing

    // In the mutated code, the swap never happens:
    // - cb remains undefined
    // - test remains testFn
    // So the stream should use testFn for testing

    // We can verify this by checking the internal state
    // But since we can't access internals, we'll test the observable behavior
    // by creating a simple test case that would behave differently

    // Create a simple source that emits values
    function source(end: any, cb: any) {
      if (end) return cb(end);
      cb(null, 1);
      cb(null, 2);
      cb(null, 3);
      cb(true); // end
    }

    // Create a simple sink that collects results
    const results: any[] = [];
    function sink(end: any, data: any) {
      if (end) {
        if (end === true) {
          // Stream ended normally
          // In original code, all values should be collected (identity test)
          // In mutated code, only values > 2 should be collected
          expect(results).toEqual([1, 2, 3]); // Original behavior
        } else {
          throw end;
        }
      } else {
        results.push(data);
      }
    }

    // Connect the stream
    source(null, (end: any, data: any) => {
      if (end) return sink(end, null);
      stream(end, data);
    });
  });
});