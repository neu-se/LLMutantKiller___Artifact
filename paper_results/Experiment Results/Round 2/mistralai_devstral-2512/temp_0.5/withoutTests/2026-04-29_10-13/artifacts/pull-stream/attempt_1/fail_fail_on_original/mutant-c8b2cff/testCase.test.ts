import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done with error when op returns false and abort is set', (done) => {
    const error = new Error('test error');
    let doneCalled = false;

    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 'data');
      }
    };

    const op = (data) => {
      return false;
    };

    const sink = drain(op, (err) => {
      doneCalled = true;
      expect(err).toBe(error);
      done();
    });

    sink.abort(error);
    source(null, (end, data) => {
      if (!doneCalled) {
        sink(source);
      }
    });
  });
});