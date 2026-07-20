import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the callback with the correct error when aborting', () => {
    let called = false;
    let err: any;
    const cb = (e: any) => {
      called = true;
      err = e;
    };
    const sink = drainModule.default(null, null);
    sink.abort(cb);
    // The mutation changes the value of err to false
    expect(err).toBe(true);
  });
});