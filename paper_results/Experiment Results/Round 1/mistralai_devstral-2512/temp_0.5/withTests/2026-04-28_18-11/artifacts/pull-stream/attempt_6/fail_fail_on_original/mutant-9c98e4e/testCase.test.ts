const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const count = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js");
const collect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

describe("count source boundary condition", () => {
  it("should emit exactly max values when max is 0", (done) => {
    const max = 0;

    pull(
      count(max),
      collect((err: Error | null, results: number[]) => {
        expect(err).toBeNull();
        expect(results).toEqual([]);
        done();
      })
    );
  });
});