const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should call read with truthy abort when op returns false', (done) => {
    let readCalls = 0;
    let abortValue: any = null;

    const op = (data: number) => {
      return data !== 2; // Return false when data is 2
    };

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort !== undefined) {
        abortValue = abort;
        return;
      }

      readCalls++;
      if (readCalls === 1) {
        cb(null, 1);
      } else if (readCalls === 2) {
        cb(null, 2); // This should trigger op returning false
      }
    };

    const sink = drain(op, (err: any) => {
      expect(abortValue).toBeTruthy();
      done();
    });

    source(null, sink);
  });
});