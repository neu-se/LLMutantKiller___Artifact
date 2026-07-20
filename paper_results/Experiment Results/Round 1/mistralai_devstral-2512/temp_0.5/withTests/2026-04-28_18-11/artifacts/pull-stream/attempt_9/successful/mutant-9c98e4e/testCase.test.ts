const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const count = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js");
const collect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

describe("count source boundary condition", () => {
  it("should emit values from 0 to max (inclusive)", (done) => {
    const max = 3;

    pull(
      count(max),
      collect((err: Error | null, results: number[]) => {
        expect(err).toBeNull();
        expect(results).toEqual([0, 1, 2, 3]);
        done();
      })
    );
  });
});