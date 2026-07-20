import reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce', () => {
  it('should call callback with null when stream ends normally (end === true)', (done) => {
    let callCount = 0;
    let i = 0;
    const values = [1, 2, 3];
    
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const sink = reduce(
      (acc: number, data: number) => acc + data,
      0,
      (err: any, val: any) => {
        callCount++;
        expect(callCount).toBe(1);
        expect(err).toBeNull();
        expect(val).toBe(6);
        done();
      }
    );

    sink(source);
  });
});