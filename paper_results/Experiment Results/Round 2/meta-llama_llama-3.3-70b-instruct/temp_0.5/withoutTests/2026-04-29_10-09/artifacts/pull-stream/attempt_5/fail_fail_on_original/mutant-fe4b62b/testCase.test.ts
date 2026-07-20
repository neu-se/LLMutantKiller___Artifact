import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the callback with the correct error when aborting', (done) => {
    const sink = drainModule.default(null, done);
    sink.abort(true, (err: any) => {
      expect(err).toBe(true);
      done();
    });
  });
});