const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should abort with true when op returns false', (done) => {
    let readCalls = 0;
    let abortValue: any = null;

    const op = (data: number) => {
      return data !== 2; // Return false when data is 2
    };

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort !== undefined) {
        abortValue = abort;
        expect(abortValue).toBe(true);
        done();
        return;
      }

      readCalls++;
      if (readCalls === 1) {
        cb(null, 1);
      } else if (readCalls === 2) {
        cb(null, 2); // This should trigger op returning false
      } else {
        cb(true);
      }
    };

    const sink = drain(op, () => {});
    source(null, sink);
  });
});