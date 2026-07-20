import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink with error handling', () => {
  it('should throw error when done callback is missing and stream ends with non-true value', () => {
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(null, 'data');
      cb('error');
    };

    expect(() => {
      const sink = drain();
      sink(source);
    }).toThrow('no done callback supplied');
  });
});