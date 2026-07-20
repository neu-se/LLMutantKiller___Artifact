import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should pass abort error to read when op returns false', (done) => {
    const testError = new Error('test abort error');
    let readCalledWithAbort = false;

    const mockRead = (abort: any, cb: (err?: any) => void) => {
      if (abort && abort !== true) {
        readCalledWithAbort = true;
        expect(abort).toBe(testError);
        cb();
      } else {
        cb(null, 'data');
      }
    };

    const op = (data: any) => false;

    const sink = drain(op, () => {
      expect(readCalledWithAbort).toBe(true);
      done();
    });

    sink(mockRead);
    sink.abort(testError);
  });
});