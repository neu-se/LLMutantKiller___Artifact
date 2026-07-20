import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream source handling", () => {
  it("should handle streams with source property correctly", (done) => {
    const sourceStream = {
      source: () => (end: any, cb: (end: any, data?: any) => void) => {
        if (end) return cb(end);
        cb(null, "test-data");
      }
    };

    const result: any[] = [];
    pull(
      sourceStream,
      pull.collect((err, data) => {
        if (err) return done(err);
        result.push(...data);
        done();
      })
    );
  });
});