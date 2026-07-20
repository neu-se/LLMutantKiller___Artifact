import reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce', () => {
  it('should call callback with null when stream ends with true and no initial accumulator', (done) => {
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i++ > 0) return cb(true);
      cb(null, 42);
    };
    const sink = reduce(
      (acc: any, data: any) => data,
      (err: any, val: any) => {
        expect(err).toBeNull();
        expect(val).toBe(42);
        done();
      }
    );
    sink(source);
  });
});