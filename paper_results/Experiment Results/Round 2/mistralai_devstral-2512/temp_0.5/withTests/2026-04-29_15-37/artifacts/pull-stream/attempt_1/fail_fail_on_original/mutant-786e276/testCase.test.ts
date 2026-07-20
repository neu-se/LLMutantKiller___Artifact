import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

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

    const result: any[] = [];
    const read = pull(
      sourceStream,
      pull.collect((err: any, data: any) => {
        if (err) {
          done(err);
        } else {
          result.push(data);
          done();
        }
      })
    );

    read(null, (end: any, data: any) => {
      if (end) {
        if (end !== true) {
          done(end);
        }
      } else {
        result.push(data);
      }
    });
  });
});