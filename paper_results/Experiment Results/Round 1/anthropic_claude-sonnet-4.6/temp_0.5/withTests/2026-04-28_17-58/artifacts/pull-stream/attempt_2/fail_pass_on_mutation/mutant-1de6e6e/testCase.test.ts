import reduce = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js');

describe('reduce', () => {
  it('should call callback with null error and accumulated value when stream ends normally', (done) => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };
    const sink = reduce((acc: number, data: number) => acc + data, 0, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(15);
      done();
    });
    sink(source);
  });
});