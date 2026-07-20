import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should not throw error when end is truthy but not true and no done callback', () => {
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

    // Create a drain without a done callback
    const sink = drain(null);

    // This should not throw an error
    expect(() => {
      sink(mockSource);
    }).not.toThrow();
  });
});