const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const count = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js");

describe("count source boundary condition", () => {
  it("should stop at exactly max when max is provided", (done) => {
    const max = 3;
    const results: number[] = [];

    pull(
      count(max),
      pull.drain(
        (data: number) => {
          results.push(data);
        },
        (err?: Error) => {
          expect(results).toEqual([0, 1, 2]);
          expect(err).toBeUndefined();
          done();
        }
      )
    );
  });
});