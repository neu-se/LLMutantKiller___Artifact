import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with source property", () => {
  it("should correctly handle streams with source property", (done) => {
    const sourceStream = {
      source: () => (abort: any, cb: (end: any, data?: any) => void) => {
        if (abort) return cb(abort);
        cb(null, "test-data");
      }
    };

    const result: any[] = [];
    const read = pull(
      sourceStream,
      pull.collect((err: any, data: any) => {
        if (err) return done(err);
        result.push(data);
        done();
      })
    );

    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
  });
});