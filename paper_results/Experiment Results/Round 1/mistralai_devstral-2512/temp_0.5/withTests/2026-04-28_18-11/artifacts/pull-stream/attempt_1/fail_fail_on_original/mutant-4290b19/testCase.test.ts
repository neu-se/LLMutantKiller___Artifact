import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial application', () => {
  it('should correctly handle partial application with multiple arguments', () => {
    const partialSink = pull((read: any) => {
      return (end: any, cb: any) => {
        if (end) cb(end);
        else read(null, (end: any, data: any) => {
          cb(null, data);
        });
      };
    }, (data: any, cb: any) => {
      cb(null, data * 2);
    }, (data: any, cb: any) => {
      cb(null, data + 1);
    });

    const results: number[] = [];
    const read = partialSink((end: any, cb: any) => {
      if (end) cb(end);
      else {
        const values = [1, 2, 3];
        let i = 0;
        const next = () => {
          if (i < values.length) {
            cb(null, values[i++]);
          } else {
            cb(true);
          }
        };
        next();
      }
    });

    read(null, (end: any, data: any) => {
      if (end) {
        expect(results).toEqual([3, 5, 7]);
      } else {
        results.push(data);
        read(null, (end: any, data: any) => {
          if (end) {
            expect(results).toEqual([3, 5, 7]);
          } else {
            results.push(data);
            read(null, (end: any, data: any) => {
              if (end) {
                expect(results).toEqual([3, 5, 7]);
              } else {
                results.push(data);
                read(null, (end: any, data: any) => {
                  expect(end).toBe(true);
                });
              }
            });
          }
        });
      }
    });
  });
});