import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink with error handling', () => {
  it('should throw error when done callback is missing and stream ends with error', (done) => {
    const error = new Error('test error');
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const sink = drain(null, undefined);

    expect(() => {
      sink(source);
    }).toThrow(error);

    done();
  });
});