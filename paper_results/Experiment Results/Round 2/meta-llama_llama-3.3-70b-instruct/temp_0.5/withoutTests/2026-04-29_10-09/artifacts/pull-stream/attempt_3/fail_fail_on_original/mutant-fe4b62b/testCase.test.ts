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
    expect(called).toBe(true);
    expect(err).toBe(true);
  });
});