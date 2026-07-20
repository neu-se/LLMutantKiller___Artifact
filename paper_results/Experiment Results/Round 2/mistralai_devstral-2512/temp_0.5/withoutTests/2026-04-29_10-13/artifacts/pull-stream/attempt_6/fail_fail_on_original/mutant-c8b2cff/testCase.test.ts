import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should pass the correct abort value to read when op returns false', (done) => {
    const testError = new Error('test abort error');
    let abortPassedToRead: any = null;
    let callOrder: string[] = [];

    const mockRead = (abort: any, cb: (err?: any, data?: any) => void) => {
      if (abort) {
        abortPassedToRead = abort;
        callOrder.push('read-with-abort');
        cb(null);
      } else {
        callOrder.push('read-normal');
        cb(null, 'data');
      }
    };

    const op = (data: any) => {
      callOrder.push('op-called');
      return false;
    };

    const sink = drain(op, (err?: any) => {
      expect(callOrder).toEqual(['read-normal', 'op-called', 'read-with-abort']);
      expect(abortPassedToRead).toBe(testError);
      done();
    });

    sink(mockRead);
    sink.abort(testError);
  });
});