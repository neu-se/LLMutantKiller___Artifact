import reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce', () => {
  it('should call callback with error immediately when source errors on first read', (done) => {
    const ERR = new Error('source error');
    let cbCallCount = 0;
    
    const source = (abort: any, cb: Function) => {
      // Always return error
      cb(ERR);
    };

    reduce(
      (acc: any, data: any) => data,
      0,
      (err: any, val: any) => {
        cbCallCount++;
        if (cbCallCount === 1) {
          expect(err).toBe(ERR);
          done();
        }
      }
    )(source);
  });
});