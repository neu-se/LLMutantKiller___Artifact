import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw an error when no done callback is supplied and stream ends with error', (done) => {
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(null, 'data');
      cb(new Error('stream error'));
    };

    const sink = drain();

    try {
      sink(source);
      // If we reach here, the test should fail because no error was thrown
      done(new Error('Expected an error to be thrown'));
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('no done callback supplied');
      done();
    }
  });
});