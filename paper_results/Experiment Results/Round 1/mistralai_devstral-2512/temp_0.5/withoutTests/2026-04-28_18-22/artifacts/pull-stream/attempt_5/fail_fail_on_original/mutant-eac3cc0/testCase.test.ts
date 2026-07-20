const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should call read with truthy value when op returns false', (done) => {
    let readCalls = 0;
    let lastAbortValue: any = null;

    const op = (data: number) => {
      return data !== 2; // Return false when data is 2
    };

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort !== undefined) {
        lastAbortValue = abort;
        // Don't call done yet, we need to verify the value was truthy
        return;
      }

      readCalls++;
      if (readCalls === 1) {
        cb(null, 1);
      } else if (readCalls === 2) {
        cb(null, 2); // This should trigger op returning false
      }
    };

    const sink = drain(op, () => {
      // Verify that read was called with a truthy abort value
      expect(lastAbortValue).toBeTruthy();
      done();
    });

    source(null, sink);
  });
});