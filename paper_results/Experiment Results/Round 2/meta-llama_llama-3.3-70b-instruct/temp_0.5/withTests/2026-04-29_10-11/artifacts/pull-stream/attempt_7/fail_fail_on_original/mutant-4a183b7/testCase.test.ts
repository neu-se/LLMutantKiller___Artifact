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

    let count = 0;
    pull(
      read,
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, (end: any, data: any) => {
            if (end) {
              expect(end).toBe(true);
            } else {
              count++;
              expect(data).toBe(values[count - 1]);
              if (count === values.length) {
                expect(end).toBe(undefined);
              }
            }
            cb(end, data);
          });
        };
      }
    )(null, (end: any, data: any) => {
      if (end) return;
    });
    expect(count).toBe(3);
  });
});