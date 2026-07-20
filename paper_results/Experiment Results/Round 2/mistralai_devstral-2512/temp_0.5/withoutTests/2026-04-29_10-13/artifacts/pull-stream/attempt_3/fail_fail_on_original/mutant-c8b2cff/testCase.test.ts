import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should pass abort value to read when op returns false', (done) => {
    const testError = new Error('test abort error');
    let abortPassedToRead: any = null;

    const mockRead = (abort: any, cb: (err?: any) => void) => {
      abortPassedToRead = abort;
      cb();
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