import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink error message', () => {
  it('should throw an error with a descriptive message when no done callback is provided and an error occurs', (done) => {
    const error = new Error('test error');
    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain();

    try {
      sink(source);
    } catch (e) {
      expect(e.message).toBe('no done callback supplied');
      done();
    }
  });
});