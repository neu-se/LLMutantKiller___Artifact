import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink with error handling', () => {
  it('should call done with error when stream ends with error and no done callback', (done) => {
    const error = new Error('test error');
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(error);
    };

    const mockDone = jest.fn();
    const sink = drain(null, mockDone);
    sink(source);

    setImmediate(() => {
      expect(mockDone).toHaveBeenCalledWith(error);
      done();
    });
  });
});