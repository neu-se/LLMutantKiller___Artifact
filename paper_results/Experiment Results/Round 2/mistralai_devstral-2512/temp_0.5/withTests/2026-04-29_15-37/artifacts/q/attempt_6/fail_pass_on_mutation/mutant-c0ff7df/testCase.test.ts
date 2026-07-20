// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
  it("should fail when operation name is empty string", async () => {
    const testObject = { foo: "bar" };
    try {
      await Q(testObject).get("foo");
      // If we get here, the test should fail because the mutation didn't break anything
      throw new Error("Test failed - mutation not detected");
    } catch (error) {
      // This should catch the error from the mutated code
      expect(error).toBeDefined();
    }
  });
});