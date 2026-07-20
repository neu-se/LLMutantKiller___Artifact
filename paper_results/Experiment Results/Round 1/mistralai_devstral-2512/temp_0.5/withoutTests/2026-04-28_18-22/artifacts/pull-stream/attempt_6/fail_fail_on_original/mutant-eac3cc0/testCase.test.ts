const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should call read with truthy abort value when op returns false', (done) => {
    let readCalls = 0;
    let abortCalled = false;

    const op = (data: number) => {
      return data !== 2; // Return false when data is 2
    };

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort !== undefined) {
        abortCalled = true;
        expect(abort).toBeTruthy();
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