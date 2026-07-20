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

    pull(
      read,
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, (end: any, data: any) => {
            if (end) {
              expect(end).toBe(true);
              done();
            } else {
              expect(data).toBe(1);
              read(null, (end: any, data: any) => {
                if (end) {
                  expect(end).toBe(true);
                  done();
                } else {
                  expect(data).toBe(2);
                  read(null, (end: any, data: any) => {
                    if (end) {
                      expect(end).toBe(true);
                      done();
                    } else {
                      expect(data).toBe(3);
                      done();
                    }
                  });
                }
              });
            }
          });
        };
      }
    )(null, (end: any, data: any) => {
      if (end) return;
    });
  });
});