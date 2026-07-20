import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should pass through values when read.source is a function', (done) => {
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
              done();
            } else {
              count++;
              expect(data).toBe(values[count - 1]);
              if (count === values.length) {
                cb(true);
                done();
              } else {
                cb(null, data);
              }
            }
          });
        };
      }
    )(null, (end: any, data: any) => {
      if (end) return;
    });
  }, 10000);
});