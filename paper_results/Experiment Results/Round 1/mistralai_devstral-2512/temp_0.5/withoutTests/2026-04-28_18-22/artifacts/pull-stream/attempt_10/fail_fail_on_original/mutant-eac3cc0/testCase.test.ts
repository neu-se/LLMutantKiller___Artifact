const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should call read with truthy abort when op returns false', (done) => {
    let callCount = 0;
    let abortCalled = false;

    const op = (data: number) => {
      callCount++;
      return data !== 2; // Return false when data is 2
    };

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort !== undefined) {
        abortCalled = true;
        expect(abort).toBe(true);
        done();
        return;
      }

      if (callCount === 0) {
        cb(null, 1);
      } else if (callCount === 1) {
        cb(null, 2); // This should trigger op returning false
      }
    };

    const sink = drain(op, () => {});
    source(null, sink);
  });
});