const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const collect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

describe("pull stream source handling", () => {
  it("should handle streams with source property correctly", (done) => {
    const sourceStream = {
      source: () => (end: any, cb: (end: any, data?: any) => void) => {
        if (end) return cb(end);
        cb(null, "test-data");
      }
    };

    pull(
      sourceStream,
      collect((err: any, data: any) => {
        if (err) return done(err);
        expect(data).toEqual(["test-data"]);
        done();
      })
    );
  });
});