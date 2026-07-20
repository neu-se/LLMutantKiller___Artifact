import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should throw an error with a descriptive message when no done callback is provided and an error occurs', () => {
    const error = new Error('test error');
    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain(null, undefined);
    expect(() => {
      source(null, (end, data) => {
        if (end) {
          sink.abort(end);
        }
      });
    }).toThrowError('no done callback supplied');
  });
});