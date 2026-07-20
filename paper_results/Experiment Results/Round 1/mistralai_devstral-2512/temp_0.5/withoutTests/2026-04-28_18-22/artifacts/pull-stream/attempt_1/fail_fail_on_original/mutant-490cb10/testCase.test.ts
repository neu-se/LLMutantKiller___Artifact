import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw an error when no done callback is supplied and stream ends with error', (done) => {
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(null, 'data');
      setTimeout(() => cb(new Error('stream error')), 10);
    };

    const sink = drain();

    try {
      source(null, sink);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('stream error');
      done();
    }
  });
});