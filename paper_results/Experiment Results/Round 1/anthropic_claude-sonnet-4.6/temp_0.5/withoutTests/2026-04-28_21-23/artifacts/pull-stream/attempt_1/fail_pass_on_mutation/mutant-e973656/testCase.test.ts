import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should not throw when stream ends normally (end === true) even when done callback is provided", () => {
    // Create a simple pull-stream source that ends immediately
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end);
      // End the stream normally on first read
      cb(true);
    }

    const done = jest.fn();

    // If the mutation is present, this will throw because:
    // end === true, and (true || true !== true) = (true || false) = true
    // which causes `throw end` to be executed
    expect(() => {
      const sink = drain(null, done);
      sink(source);
    }).not.toThrow();

    // Also verify done was called with null (normal end)
    expect(done).toHaveBeenCalledWith(null);
  });
});