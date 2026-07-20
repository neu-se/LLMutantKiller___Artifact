import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should use true as default abort value when callback is provided as first argument', (done) => {
    const sink = drain();
    const sinkAny = sink as any;

    // Create a mock read function to capture the abort call
    const mockRead = jest.fn((abort, cb) => {
      // The abort value should be true in original code, false in mutated
      expect(abort).toBe(true);
      cb(true);
    });

    // Replace the internal read function
    sinkAny.read = mockRead;

    // Call abort with callback as first argument
    sinkAny.abort(function(err: any) {
      // This callback should be called with true in original, false in mutated
      expect(err).toBe(true);
      done();
    });
  });
});