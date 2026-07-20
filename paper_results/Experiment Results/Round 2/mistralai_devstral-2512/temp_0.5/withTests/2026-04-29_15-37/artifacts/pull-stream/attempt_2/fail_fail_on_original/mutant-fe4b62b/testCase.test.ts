import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain abort behavior', () => {
  it('should abort with true when callback is provided as first argument', (done) => {
    const drain = pull.drain();
    let abortCalled = false;
    let abortValue: any = null;

    // Simulate calling abort with a callback as the first argument
    (drain as any).abort(function(err: any) {
      abortCalled = true;
      abortValue = err;
    });

    // Verify that abort was called with true (original behavior)
    setImmediate(() => {
      expect(abortCalled).toBe(true);
      expect(abortValue).toBe(true);
      done();
    });
  });
});