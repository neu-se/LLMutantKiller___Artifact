import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with object argument", () => {
  it("should handle object streams correctly", (done) => {
    const data = [1, 2, 3];
    const source = {
      source: (read: any) => {
        let i = 0;
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
        const results: number[] = [];
        return function (abort: any, cb: any) {
          if (abort) {
            cb(abort);
          } else {
            read(null, function next(end: any, chunk: any) {
              if (end) {
                cb(end);
              } else {
                results.push(chunk);
                read(null, next);
              }
            });
          }
        };
      }
    };

    const read = pull(
      source,
      pull.collect((err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toEqual([1, 2, 3]);
        done();
      })
    );

    read(null, () => {});
  });
});