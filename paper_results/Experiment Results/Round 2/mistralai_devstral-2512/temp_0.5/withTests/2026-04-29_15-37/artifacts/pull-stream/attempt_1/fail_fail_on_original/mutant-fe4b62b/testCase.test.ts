import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain abort behavior', () => {
  it('should abort with true when callback is provided as first argument', (done) => {
    const sink = drain();
    let abortCalled = false;
    let abortValue: any = null;

    // Simulate calling abort with a callback as the first argument
    (sink as any).abort(function(err: any) {
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