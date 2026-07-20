import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should pass through values when read.source is a function', () => {
    const values = [1, 2, 3];
    const read = {
      source: () => {
        return function (end: any, cb: any) {
          if (end) return cb(end);
          cb(null, values.shift());
        };
      },
    };

    let result: any[] = [];
    pull(
      read,
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, (end: any, data: any) => {
            if (end) {
              expect(end).toBe(true);
              cb(end);
            } else {
              result.push(data);
              cb(null, data);
            }
          });
        };
      },
      pull.collect((err: any, data: any) => {
        if (err) throw err;
        expect(data).toEqual(result);
        expect(result).toEqual([1, 2, 3]);
      })
    );
  });
});