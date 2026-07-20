import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with two arguments', () => {
  it('should correctly handle partial application with two arguments', (done) => {
    const values = [1, 2, 3];
    let index = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else if (index >= values.length) {
        cb(true);
      } else {
        cb(null, values[index++]);
      }
    };

    const transform1 = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data * 2);
          }
        });
      };
    };

    const transform2 = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data + 1);
          }
        });
      };
    };

    const partialSink = pull(transform1, transform2);
    const result = partialSink(source);

    const collected: number[] = [];
    result(null, (end: any, data: any) => {
      if (end === true) {
        expect(collected).toEqual([3, 5, 7]);
        done();
      } else if (end) {
        done(end);
      } else {
        collected.push(data);
        result(null, (end: any, data: any) => {
          if (end === true) {
            expect(collected).toEqual([3, 5, 7]);
            done();
          } else if (end) {
            done(end);
          } else {
            collected.push(data);
            result(null, (end: any, data: any) => {
              if (end === true) {
                expect(collected).toEqual([3, 5, 7]);
                done();
              } else if (end) {
                done(end);
              } else {
                collected.push(data);
                result(true, (end: any) => {
                  expect(end).toBe(true);
                  expect(collected).toEqual([3, 5, 7]);
                  done();
                });
              }
            });
          }
        });
      }
    });
  });
});