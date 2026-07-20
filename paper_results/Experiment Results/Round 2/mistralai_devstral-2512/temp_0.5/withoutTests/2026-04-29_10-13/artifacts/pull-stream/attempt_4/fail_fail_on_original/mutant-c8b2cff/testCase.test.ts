import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should pass the correct abort value to read when op returns false', (done) => {
    const testError = new Error('test abort error');
    let abortPassedToRead: any = null;
    let callbackCount = 0;

    const mockRead = (abort: any, cb: (err?: any) => void) => {
      abortPassedToRead = abort;
      callbackCount++;
      if (callbackCount === 1) {
        // First call - return data to trigger op
        cb(null, 'data');
      } else {
        // Second call - verify abort was passed correctly
        cb();
      }
    };

    const op = (data: any) => false;

    const sink = drain(op, () => {
      expect(abortPassedToRead).toBe(testError);
      done();
    });

    sink(mockRead);
    sink.abort(testError);
  });
});