const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should abort with truthy value when op returns false', (done) => {
    let callCount = 0;
    let abortValue: any = null;

    const op = (data: number) => {
      callCount++;
      return data !== 2; // Return false when data is 2
    };

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort !== undefined) {
        abortValue = abort;
        return;
      }

      if (callCount === 0) {
        cb(null, 1);
      } else if (callCount === 1) {
        cb(null, 2); // This should trigger op returning false
      } else {
        cb(true);
      }
    };

    const sink = drain(op, (err) => {
      expect(abortValue).toBeTruthy();
      done();
    });

    source(null, sink);
  });
});