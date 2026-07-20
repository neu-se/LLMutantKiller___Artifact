import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done callback with null when stream ends normally', (done) => {
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(null, 'data');
      cb(true); // End the stream
    };

    const doneCallback = (err) => {
      expect(err).toBeNull();
      done();
    };

    const sink = drain(null, doneCallback);
    source(null, sink);
  });
});