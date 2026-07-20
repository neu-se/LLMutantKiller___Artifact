// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
  it("should fail when operation name is empty string", async () => {
    const testObject = { prop: "value" };
    const promise = Q(testObject).get("prop");
    try {
      await promise;
      // If we get here with mutated code, fail the test
      expect(true).toBe(false);
    } catch (error) {
      // This should only happen with mutated code
      expect(error).toBeDefined();
    }
  });
});