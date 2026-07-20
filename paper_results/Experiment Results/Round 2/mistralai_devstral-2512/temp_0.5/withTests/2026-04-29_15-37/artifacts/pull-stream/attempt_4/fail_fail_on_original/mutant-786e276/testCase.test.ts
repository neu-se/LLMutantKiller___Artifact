import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream with source property", () => {
  it("should handle streams with source property correctly", (done) => {
    const sourceStream = {
      source: (abort: any, cb: (end: any, data?: any) => void) => {
        if (abort) {
          cb(abort);
        } else {
          cb(null, "test-data");
        }
      }
    };

    const collect = (cb: (err: any, data: any) => void) => {
      const results: any[] = [];
      return (end: any, data: any) => {
        if (end) {
          if (end === true) {
            cb(null, results);
          } else {
            cb(end, null);
          }
        } else {
          results.push(data);
        }
      };
    };

    pull(
      sourceStream,
      collect((err: any, data: any) => {
        if (err) {
          done(err);
        } else {
          expect(data).toEqual(["test-data"]);
          done();
        }
      })
    );
  });
});