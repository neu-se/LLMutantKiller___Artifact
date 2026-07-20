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

    const results: any[] = [];
    const read = pull(sourceStream);

    read(null, (end: any, data: any) => {
      if (end) {
        if (end === true) {
          expect(results).toEqual(["test-data"]);
          done();
        } else {
          done(end);
        }
      } else {
        results.push(data);
        read(null, (end: any, data: any) => {
          if (end) {
            if (end === true) {
              expect(results).toEqual(["test-data"]);
              done();
            } else {
              done(end);
            }
          } else {
            results.push(data);
          }
        });
      }
    });
  });
});