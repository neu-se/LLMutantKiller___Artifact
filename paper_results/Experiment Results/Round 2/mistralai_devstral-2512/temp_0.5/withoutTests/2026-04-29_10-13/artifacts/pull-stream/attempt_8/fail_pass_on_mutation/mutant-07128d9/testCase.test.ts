import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle truthy non-true end value with done callback', (done) => {
    const mockSource = (abort: any, cb: (err?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      // Simulate async completion with truthy non-true value
      setImmediate(() => {
        cb("some truthy value");
      });
    };

    // Create a drain WITH a done callback
    const sink = drain(null, (err: any) => {
      // This should be called with the truthy value
      expect(err).toBe("some truthy value");
      done();
    });

    // This should not throw an error because we have a done callback
    sink(mockSource);
  });
});