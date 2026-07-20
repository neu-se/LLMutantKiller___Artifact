import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull with 4 arguments', () => {
  it('should correctly handle 4 arguments in partial application', (done) => {
    const values = [1, 2, 3, 4];
    let i = 0;
    const source = (abort: any, cb: (end: any, data?: number) => void) => {
      if (abort) {
        i = values.length;
        cb(abort);
      } else if (i >= values.length) {
        cb(true);
      } else {
        cb(null, values[i++]);
      }
    };

    const through = (read: (abort: any, cb: (end: any, data?: number) => void) => void) => {
      return (abort: any, cb: (end: any, data?: number) => void) => {
        read(abort, (end: any, data?: number) => {
          if (end) cb(end);
          else cb(null, data);
        });
      };
    };

    const collect = (read: (abort: any, cb: (end: any, data?: number) => void) => void) => {
      const result: number[] = [];
      return (abort: any, cb: (end: any, data?: number[]) => void) => {
        read(abort, (end: any, data?: number) => {
          if (end) {
            if (end === true) cb(null, result);
            else cb(end, result);
          } else if (data !== undefined) {
            result.push(data);
          }
        });
      };
    };

    pull(
      source,
      through,
      through,
      through,
      through,
      collect(null, (err: any, result?: number[]) => {
        if (err) {
          done(err);
          return;
        }
        expect(result).toEqual([1, 2, 3, 4]);
        done();
      })
    );
  });
});