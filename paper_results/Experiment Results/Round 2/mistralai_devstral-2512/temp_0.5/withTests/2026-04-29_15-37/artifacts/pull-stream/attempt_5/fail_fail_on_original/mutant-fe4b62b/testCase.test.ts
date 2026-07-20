import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should abort with true when callback is provided as first argument', (done) => {
    const sink = drain();
    let abortValue: any = null;

    // Simulate calling abort with a callback as the first argument
    (sink as any).abort(function(err: any) {
      abortValue = err;
    });

    // The abort function should immediately set the abort value
    // and the callback should be called synchronously
    expect(abortValue).toBe(true);
    done();
  });
});