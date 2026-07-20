import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial application', () => {
  it('should correctly handle partial application with multiple arguments', () => {
    const partialSink = pull(
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, cb);
        };
      },
      (data: any) => data * 2,
      (data: any) => data + 1
    );

    const results: number[] = [];
    const source = (end: any, cb: any) => {
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
    };

    const read = partialSink(source);

    read(null, (end: any, data: any) => {
      if (!end) {
        results.push(data);
        read(null, (end: any, data: any) => {
          if (!end) {
            results.push(data);
            read(null, (end: any, data: any) => {
              if (!end) {
                results.push(data);
                read(null, (end: any, data: any) => {
                  expect(end).toBe(true);
                  expect(results).toEqual([3, 5, 7]);
                });
              }
            });
          }
        });
      }
    });
  });
});