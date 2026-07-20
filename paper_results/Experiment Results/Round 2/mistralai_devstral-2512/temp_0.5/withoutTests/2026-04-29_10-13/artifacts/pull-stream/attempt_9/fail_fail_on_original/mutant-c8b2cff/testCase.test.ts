import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should pass the exact abort value to read when op returns false', (done) => {
    const testError = new Error('test abort error');
    let receivedAbort: any = null;
    let callCount = 0;

    const mockRead = (abort: any, cb: (err?: any, data?: any) => void) => {
      callCount++;
      if (callCount === 1) {
        // First call - normal read
        cb(null, 'data');
      } else if (callCount === 2) {
        // Second call - should receive the exact abort value
        receivedAbort = abort;
        cb(null);
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