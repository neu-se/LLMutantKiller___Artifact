import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should set internal abort state to true when callback is provided as first argument', () => {
    const sink = drain();
    const sinkAny = sink as any;

    // Call abort with a callback as the first argument
    sinkAny.abort(function(err: any) {});

    // Access the internal abort state through the sink function
    // The original code sets abort = err || true (which becomes true)
    // The mutated code sets abort = err || false (which becomes false)
    expect(sinkAny.abort).toBe(true);
  });
});