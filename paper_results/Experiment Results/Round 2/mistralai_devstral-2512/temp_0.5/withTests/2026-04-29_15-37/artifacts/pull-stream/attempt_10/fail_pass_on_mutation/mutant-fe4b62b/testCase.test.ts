import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should set abort to true when callback is provided as first argument', () => {
    const sink = drain();
    const sinkAny = sink as any;

    // Call abort with callback as first argument
    sinkAny.abort(function(err: any) {});

    // The abort function should set the internal abort state
    // In original code: abort = err || true (becomes true)
    // In mutated code: abort = err || false (becomes false)
    // We can check this by calling the sink function which uses the abort state
    const mockRead = jest.fn((abort, cb) => {
      cb(abort);
    });

    // Call the sink with our mock read function
    sink(mockRead);

    // The mock read should have been called with true (original) or false (mutated)
    expect(mockRead.mock.calls[0][0]).toBe(true);
  });
});