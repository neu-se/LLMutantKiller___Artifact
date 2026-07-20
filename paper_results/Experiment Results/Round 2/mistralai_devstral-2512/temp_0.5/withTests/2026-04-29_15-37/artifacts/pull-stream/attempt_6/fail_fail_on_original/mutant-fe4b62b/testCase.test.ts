import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should set abort to true when callback is provided as first argument', () => {
    const sink = drain();
    const sinkAny = sink as any;

    // Call abort with a callback as the first argument
    sinkAny.abort(function(err: any) {});

    // The abort value should be set to true in the original code
    // but false in the mutated code
    expect(sinkAny.abort).toBe(true);
  });
});