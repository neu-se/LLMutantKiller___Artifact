import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should pass abort error to read when op returns false and abort is called', (done) => {
    const testError = new Error('test abort error');
    let receivedAbort: any = null;

    const mockRead = (abort: any, cb: (err?: any, data?: any) => void) => {
      if (abort) {
        receivedAbort = abort;
        cb(null);
      } else {
        cb(null, 'data');
      }
    };

    const op = (data: any) => false;

    const sink = drain(op, (err?: any) => {
      expect(receivedAbort).toBe(testError);
      done();
    });

    sink(mockRead);
    sink.abort(testError);
  });
});