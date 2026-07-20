import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with null error when stream ends normally without finding a match", (done) => {
    // Create a simple pull-stream source that emits some values and then ends
    function source(end: any, cb: Function) {
      if (end) {
        cb(end);
        return;
      }
      // Emit a value that won't match our test
      cb(null, 1);
    }

    let callCount = 0;
    let sourceEnded = false;

    // Create a source that emits one value then ends
    function limitedSource(end: any, cb: Function) {
      if (end) {
        cb(end);
        return;
      }
      if (!sourceEnded) {
        sourceEnded = true;
        cb(null, 42); // emit a value
      } else {
        cb(true); // end the stream
      }
    }

    // Use find with a test that never matches
    const sink = find(
      (data: number) => data === 999, // never matches
      (err: any, data: any) => {
        // When stream ends without finding a match, err should be null (not true)
        expect(err).toBe(null);
        expect(data).toBe(null);
        done();
      }
    );

    // Connect source to sink
    sink(limitedSource);
  });
});