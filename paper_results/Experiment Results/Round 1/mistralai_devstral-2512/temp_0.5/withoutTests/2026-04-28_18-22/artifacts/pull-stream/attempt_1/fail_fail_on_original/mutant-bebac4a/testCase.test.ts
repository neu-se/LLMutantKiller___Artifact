import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should not call read when sink has not been initialized', (done) => {
    const sink = drain();
    let readCalled = false;

    // Override the read function to track if it's called
    const mockRead = (abort, cb) => {
      readCalled = true;
      cb();
    };

    // Replace the internal read function
    const sinkAny = sink as any;
    sinkAny.read = mockRead;

    // Call abort before the sink is initialized
    sink.abort(null, () => {
      expect(readCalled).toBe(false);
      done();
    });
  });
});