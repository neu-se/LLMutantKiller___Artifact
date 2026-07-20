const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe("find with callback", () => {
  it("should call callback with found value when cb is provided", (done) => {
    const testData = [1, 2, 3, 4, 5];
    const expectedValue = 3;

    pull(
      pull.values(testData),
      find((d: number) => d === expectedValue, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(expectedValue);
        done();
      })
    );
  });
});