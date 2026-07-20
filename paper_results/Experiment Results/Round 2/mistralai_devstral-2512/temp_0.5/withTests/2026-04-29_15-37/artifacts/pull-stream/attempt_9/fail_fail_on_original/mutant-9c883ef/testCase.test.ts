const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe("find callback behavior", () => {
  it("should handle callback parameter correctly when cb is not provided", (done) => {
    const testData = [1, 2, 3, 4, 5];
    const expectedValue = 3;

    // Create a simple values source function
    function values(array: any[]) {
      let i = 0;
      return function(end: any, cb: any) {
        if (end) {
          cb(end);
        } else if (i >= array.length) {
          cb(true);
        } else {
          cb(null, array[i++]);
        }
      };
    }

    // Create a simple collect sink function
    function collect(cb: any) {
      const results: any[] = [];
      return function(end: any, data: any) {
        if (end) {
          cb(end === true ? null : end, results);
        } else {
          results.push(data);
        }
      };
    }

    // This test specifically checks the behavior when no callback is provided
    // In the original code, when cb is falsy, it should swap cb and test
    // In the mutated code (if(false)), this swap never happens
    const stream = find((d: number) => d === expectedValue);

    pull(
      values(testData),
      stream,
      collect((err: any, results: number[]) => {
        // In original code, since no cb was provided, the test function becomes the identity
        // So it should collect all values
        expect(err).toBeNull();
        expect(results).toEqual(testData);
        done();
      })
    );
  });
});