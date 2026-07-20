import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink - end of stream without match", () => {
  it("should call callback with null error when stream ends normally without finding a match", (done) => {
    // Create a simple pull-stream source that emits values and ends normally
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      if (i >= values.length) {
        cb(true); // normal end-of-stream in pull-stream convention (true means end)
        return;
      }
      cb(null, values[i++]);
    }

    // test function that never matches any value
    const testFn = (d: number) => d === 999;

    const sink = find(testFn, (err: any, data: any) => {
      // In original code: err === true ? null : err => null (stream ended with true, so null)
      // In mutated code: err === false ? null : err => true (true !== false, so err=true is passed)
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    });

    // Connect source to sink (pull-stream style)
    sink(source);
  });
});