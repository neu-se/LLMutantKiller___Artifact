const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator function", () => {
  it("should correctly handle generator with StopIteration", async () => {
    const result = await Q.async(function* () {
      const val = yield Q("test");
      return val;
    })();

    expect(result).toBe("test");
  });
});