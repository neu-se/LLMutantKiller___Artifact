import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should not call read when sink has not been initialized', () => {
    const sink = drain();
    let readCalled = false;

    // Override the read function to track if it's called
    const mockRead = (abort: any, cb: () => void) => {
      readCalled = true;
      cb();
    };

    // Replace the internal read function
    const sinkAny = sink as any;
    sinkAny.read = mockRead;

    // Call abort before the sink is initialized
    sink.abort(null, () => {
      // This should never be called in the original code
      expect(readCalled).toBe(false);
    });

    // Give a small delay to ensure async operations complete
    return new Promise(resolve => setTimeout(resolve, 100)).then(() => {
      expect(readCalled).toBe(false);
    });
  });
});