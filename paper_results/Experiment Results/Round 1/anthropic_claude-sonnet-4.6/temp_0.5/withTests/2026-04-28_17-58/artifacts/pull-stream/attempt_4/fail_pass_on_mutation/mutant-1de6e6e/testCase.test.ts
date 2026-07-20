import reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce', () => {
  it('reduce without initial accumulator should use first element as accumulator and handle stream end', (done) => {
    const values = [10, 2, 3];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };
    // No initial accumulator - cb is second arg
    const sink = reduce((acc: any, data: any) => acc + data, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(15);
      done();
    });
    sink(source);
  });
});