const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator function", () => {
  it("should correctly handle generator with multiple yields", async () => {
    const result = await Q.async(function* () {
      const val1 = yield Q("first");
      const val2 = yield Q(val1 + " second");
      return val2 + " third";
    })();

    expect(result).toBe("first second third");
  });
});