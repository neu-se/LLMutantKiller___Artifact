import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should set abort to true when callback is provided as first argument', () => {
    const sink = drain();
    const sinkAny = sink as any;

    // Call abort with callback as first argument
    sinkAny.abort(function(err: any) {});

    // The abort function modifies the internal abort state
    // In original code: abort = err || true (becomes true)
    // In mutated code: abort = err || false (becomes false)
    // We need to trigger the read to see the effect
    const mockCb = jest.fn();
    sinkAny.read(null, mockCb);

    // The read function should be called with true (original) or false (mutated)
    expect(mockCb).toHaveBeenCalledWith(true);
  });
});