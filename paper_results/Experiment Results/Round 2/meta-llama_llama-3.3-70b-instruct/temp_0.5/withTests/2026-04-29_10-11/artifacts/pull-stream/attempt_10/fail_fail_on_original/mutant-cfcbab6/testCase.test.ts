import { pull } from '../../../pull.js';

describe('pull function', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const values = [1, 2, 3, 4, 5];
    const result: any[] = [];
    pull(
      pull.values(values),
      (read: any) => {
        return function (end: any, cb: any) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      },
      (read: any) => {
        return function (end: any, cb: any) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      },
      pull.collect((err: any, ary: any) => {
        if (err) throw err;
        expect(ary).toEqual([1, 2, 3, 4, 5, undefined]);
      })
    );
  });
});