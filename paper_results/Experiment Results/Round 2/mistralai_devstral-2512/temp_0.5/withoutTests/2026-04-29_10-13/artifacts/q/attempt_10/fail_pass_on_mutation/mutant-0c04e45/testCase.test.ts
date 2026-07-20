const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator function", () => {
  it("should correctly handle generator with nested promises", async () => {
    const result = await Q.async(function* () {
      const val = yield Q.delay(Q("delayed"), 10);
      return val + " value";
    })();

    expect(result).toBe("delayed value");
  });
});