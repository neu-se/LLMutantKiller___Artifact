import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call done with error when stream ends with non-true error', (done) => {
    const error = new Error('test error');
    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const doneCallback = jest.fn((err) => {
      expect(err).toBe(error);
      done();
    });

    const sink = drain(null, doneCallback);
    sink(source);
  });
});