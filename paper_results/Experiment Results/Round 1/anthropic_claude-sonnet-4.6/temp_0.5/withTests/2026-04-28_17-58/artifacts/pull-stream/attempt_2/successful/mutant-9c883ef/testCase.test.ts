const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe("find called with only a callback (no test function)", () => {
  it("should find the first element when called with a single callback argument", (done) => {
    pull(
      pull.values([10, 20, 30]),
      pull.find(function (err: Error | null, result: number | null) {
        expect(err).toBeNull();
        expect(result).toBe(10);
        done();
      })
    );
  });
});