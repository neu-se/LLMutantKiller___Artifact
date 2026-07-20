import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw an error when no done callback is provided and stream ends with error', (done) => {
    const error = new Error('test error');
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain();
    try {
      source(null, sink);
      done.fail('Expected an error to be thrown');
    } catch (err) {
      expect(err).toBe(error);
      done();
    }
  });
});