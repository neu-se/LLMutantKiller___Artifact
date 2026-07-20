import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should correctly handle 3 arguments in the pull function', (done) => {
    const input = [1, 2, 3];
    const expectedOutput = [2, 4, 6];

    const values = (array: any[]) => {
      let i = 0;
      return (abort: any, cb: any) => {
        if (abort) return cb(abort);
        if (i >= array.length) return cb(true);
        cb(null, array[i++]);
      };
    };

    const map = (fn: any) => {
      return (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end);
            cb(null, fn(data));
          });
        };
      };
    };

    const collect = (cb: any) => {
      const result: any[] = [];
      return (read: any) => {
        return (abort: any, next: any) => {
          if (abort) return read(abort, (end: any) => cb(end, result));
          read(null, function loop(end: any, data: any) {
            if (end) return cb(end === true ? null : end, result);
            result.push(data);
            read(null, loop);
          });
        };
      };
    };

    pull(
      values(input),
      map((x: number) => x * 2),
      map((x: number) => x),
      collect((err: any, result: number[]) => {
        if (err) {
          done(err);
          return;
        }
        expect(result).toEqual(expectedOutput);
        done();
      })
    );
  });
});