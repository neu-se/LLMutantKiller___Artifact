import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";
import pull from "pull-stream";

describe("take mutation test", () => {
  it("should handle termination correctly when last is true", (done) => {
    const source = pull.values([1, 2, 3, 4, 5]);
    const expected = [1, 2, 3];
    const result: number[] = [];

    pull(
      source,
      take(3, { last: true }),
      pull.collect((err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual(expected);
        done();
      })
    );
  });
});