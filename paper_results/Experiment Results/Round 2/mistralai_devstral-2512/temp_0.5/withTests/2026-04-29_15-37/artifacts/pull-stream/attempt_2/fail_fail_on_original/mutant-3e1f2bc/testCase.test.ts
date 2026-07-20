import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream mutation test", () => {
  it("should correctly handle object streams", (done) => {
    const source = {
      source: (read: any) => {
        let i = 0;
        const data = [1, 2, 3];
        return function (abort: any, cb: any) {
          if (abort) {
            cb(abort);
          } else if (i >= data.length) {
            cb(true);
          } else {
            cb(null, data[i++]);
          }
        };
      },
      sink: (read: any) => {
        return function (abort: any, cb: any) {
          if (abort) {
            cb(abort);
          } else {
            read(null, function next(end: any, chunk: any) {
              if (end) {
                cb(end);
              } else {
                read(null, next);
              }
            });
          }
        };
      }
    };

    const results: number[] = [];
    const read = pull(
      source,
      pull.through((data: number) => {
        results.push(data);
      }, (err: any) => {
        expect(err).toBeFalsy();
        expect(results).toEqual([1, 2, 3]);
        done();
      })
    );

    read(null, () => {});
  });
});