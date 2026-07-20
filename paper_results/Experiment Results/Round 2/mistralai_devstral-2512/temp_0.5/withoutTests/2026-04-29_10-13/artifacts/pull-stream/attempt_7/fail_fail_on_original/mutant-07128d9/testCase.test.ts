import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle truthy non-true end value differently based on condition', () => {
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

    // This should throw in original but not in mutated version
    expect(() => {
      sink(mockSource);
    }).toThrow("some truthy value");
  });
});