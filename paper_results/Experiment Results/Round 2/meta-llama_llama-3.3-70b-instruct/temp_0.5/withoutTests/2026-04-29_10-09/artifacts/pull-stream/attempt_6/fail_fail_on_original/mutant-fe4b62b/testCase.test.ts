import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the callback with the correct error when aborting', () => {
    const sink = drainModule.default(null, null);
    let err: any;
    sink.abort(true, (e: any) => {
      err = e;
    });
    // In the original code, cb = err, err = true, so err should be true
    // In the mutated code, cb = err, err = false, so err should be false
    // This test should pass on the original code and fail on the mutated code
    expect(err).toBe(true);
  });
});