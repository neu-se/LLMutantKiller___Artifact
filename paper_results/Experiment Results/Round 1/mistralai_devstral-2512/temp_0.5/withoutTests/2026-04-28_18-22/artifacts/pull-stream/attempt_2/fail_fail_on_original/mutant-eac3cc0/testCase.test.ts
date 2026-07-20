const drain = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('drain sink', () => {
  it('should abort with true when op returns false', (done) => {
    const data = [1, 2, 3];
    let callCount = 0;

    const op = (d: number) => {
      callCount++;
      return d !== 2; // Return false when data is 2
    };

    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        expect(abort).toBe(true);
        done();
        return;
      }
      if (callCount >= data.length) {
        cb(true);
        return;
      }
      cb(null, data[callCount]);
    };

    const sink = drain(op, () => {});
    source(null, sink);
  });
});