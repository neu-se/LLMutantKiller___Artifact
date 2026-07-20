import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should pass the actual abort value to read when op returns false', (done) => {
    const testError = new Error('test abort error');
    let receivedAbort: any = null;
    let callCount = 0;

    const mockRead = (abort: any, cb: (err?: any, data?: any) => void) => {
      callCount++;
      if (callCount === 1) {
        // First call - normal read
        cb(null, 'data');
      } else if (callCount === 2) {
        // Second call - check what abort value was passed
        receivedAbort = abort;
        // In original code: abort || true → true (if abort is truthy)
        // In mutated code: true (always)
        // So we need to check if it's the actual error object
        expect(receivedAbort).toBe(testError);
        cb(null);
      }
    };

    const op = (data: any) => false;

    const sink = drain(op, (err?: any) => {
      done();
    });

    sink(mockRead);
    sink.abort(testError);
  });
});