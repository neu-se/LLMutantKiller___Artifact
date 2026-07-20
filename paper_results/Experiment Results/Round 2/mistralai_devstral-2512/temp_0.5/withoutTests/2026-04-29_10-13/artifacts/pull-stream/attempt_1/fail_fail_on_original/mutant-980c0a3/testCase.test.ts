import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done with non-true end value when stream ends with error', (done) => {
    const error = new Error('test error');
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const doneCallback = (end) => {
      expect(end).toBe(error);
      done();
    };

    const sink = drain(null, doneCallback);
    source(null, sink);
  });
});