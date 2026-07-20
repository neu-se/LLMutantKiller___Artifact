import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain error handling', () => {
  it('should throw error when end is not true and no done callback', (done) => {
    const error = new Error('test error');
    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, undefined);

    try {
      pull(source, sink);
      done(new Error('Expected error to be thrown'));
    } catch (e) {
      expect(e).toBe(error);
      done();
    }
  });
});