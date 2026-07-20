const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise inspection mutation test", () => {
  it("should correctly identify fulfilled promises in allSettled", async () => {
    const promises = [Q(1), Q(2), Q(3)];
    const results = await Q.allSettled(promises);

    // Check that all promises are correctly identified as fulfilled
    results.forEach((result, index) => {
      expect(result.state).toBe("fulfilled");
      expect(result.value).toBe(index + 1);
    });
  });
});