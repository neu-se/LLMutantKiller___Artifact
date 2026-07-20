import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";
import pull = require("pull-stream");

describe("take mutation test", () => {
  it("should correctly handle termination when last is false", (done) => {
    const source = pull.values([1, 2, 3, 4, 5]);
    const takeStream = take(2, { last: false });

    const results: number[] = [];
    pull(
      source,
      takeStream,
      pull.collect((err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual([1, 2]);
        done();
      })
    );
  });
});