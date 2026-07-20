import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull with 4 arguments', () => {
  it('should correctly handle 4 arguments in partial application', (done) => {
    const values = [1, 2, 3, 4];
    let i = 0;
    const source = (abort: any, cb: (arg0: any, arg1: number) => void) => {
      if (abort) {
        i = values.length;
        cb(abort);
      } else if (i >= values.length) {
        cb(true);
      } else {
        cb(null, values[i++]);
      }
    };

    const through1 = (read: (arg0: any, arg1: (arg0: any, arg1: number) => void) => void) => {
      return (abort: any, cb: (arg0: any, arg1: number) => void) => {
        read(abort, (end: any, data: number) => {
          if (end) cb(end);
          else cb(null, data);
        });
      };
    };

    const through2 = through1;
    const through3 = through1;
    const through4 = through1;

    const collect = (read: (arg0: any, arg1: (arg0: any, arg1: number[]) => void) => void) => {
      const result: number[] = [];
      return (abort: any, cb: (arg0: any, arg1: number[]) => void) => {
        read(abort, (end: any, data: number) => {
          if (end) {
            if (end === true) cb(null, result);
            else cb(end, result);
          } else {
            result.push(data);
          }
        });
      };
    };

    pull(
      source,
      through1,
      through2,
      through3,
      through4,
      collect(null, (err: any, result: number[]) => {
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