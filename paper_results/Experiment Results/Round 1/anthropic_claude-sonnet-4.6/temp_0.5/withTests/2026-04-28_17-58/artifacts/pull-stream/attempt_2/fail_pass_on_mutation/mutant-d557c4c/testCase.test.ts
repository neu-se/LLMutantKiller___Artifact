import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull with plain through function', () => {
  it('should correctly process values through a plain function without calling .sink on it', (done) => {
    const results: number[] = [];

    const source = (() => {
      const values = [1, 2, 3];
      let i = 0;
      return (abort: any, cb: Function) => {
        if (abort) return cb(abort);
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    })();

    const double = (read: Function) => {
      return (abort: any, cb: Function) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    };

    const sink = (read: Function) => {
      read(null, function next(end: any, data: any) {
        if (end) {
          expect(results).toEqual([2, 4, 6]);
          done();
          return;
        }
        results.push(data);
        read(null, next);
      });
    };

    pull(source, double, sink);
  });
});