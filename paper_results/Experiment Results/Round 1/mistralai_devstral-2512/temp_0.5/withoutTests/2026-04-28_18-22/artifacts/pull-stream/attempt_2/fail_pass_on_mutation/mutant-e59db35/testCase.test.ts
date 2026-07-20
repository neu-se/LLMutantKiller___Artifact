import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort behavior", () => {
  it("should propagate abort errors correctly when err is truthy", (done) => {
    const testError = new Error("test error");
    const abortSignal = true;

    let readCallCount = 0;
    let lastAbortArg = null;
    let lastCbArg = null;

    const mockRead = (abort, cb) => {
      readCallCount++;
      lastAbortArg = abort;
      lastCbArg = cb;

      if (abort) {
        // Simulate the original behavior: read(err || abort, cb)
        // When err is truthy, it should be passed
        cb(testError);
      } else {
        cb(null, [1, 2, 3]);
      }
    };

    const flattened = flatten()(mockRead);

    // First call to establish _read
    flattened(null, (end, data) => {
      // Second call with abort
      flattened(true, (err) => {
        expect(readCallCount).toBe(2);
        expect(lastAbortArg).toBe(true);
        expect(err).toBe(testError);
        done();
      });
    });
  });
});