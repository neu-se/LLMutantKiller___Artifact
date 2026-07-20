const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should call read with true when op returns false', (done) => {
    const data = [1, 2, 3];
    let callCount = 0;
    let abortValue: any = null;

    const op = (d: number) => {
      callCount++;
      return d !== 2; // Return false when data is 2
    };

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort !== null) {
        abortValue = abort;
        return;
      }
      if (callCount >= data.length) {
        cb(true);
        return;
      }
      cb(null, data[callCount]);
    };

    const sink = drain(op, () => {
      expect(abortValue).toBe(true);
      done();
    });

    // Simulate the read function being called by the sink
    const read = (abort: any, cb: (err: any, data?: any) => void) => {
      source(abort, cb);
    };

    // Manually trigger the sink with the read function
    (sink as any)(read);
  });
});