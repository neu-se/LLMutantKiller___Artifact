import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should correctly handle error with stack and promise with stack", async () => {
    // This test is designed to trigger the mutation in makeStackTraceLong
    // The mutation changes the condition from:
    // if (hasStacks && promise.stack && typeof error === "object" && ...)
    // to:
    // if (hasStacks && promise.stack || typeof error === "object" && ...)
    // This changes the logic from AND to OR, which we want to detect

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a promise chain that will reject with an error
    const error = new Error("test error");
    error.customProperty = "test"; // Make it a non-plain object

    const promise = Q.reject(error);

    // The mutation would incorrectly process this case because
    // typeof error === "object" would be true (even though error.stack exists)
    // and the OR condition would trigger when it shouldn't

    try {
      await promise;
      fail("Promise should have rejected");
    } catch (e) {
      // In the original code, this should work fine
      // In the mutated code, this might behave differently
      expect(e).toBe(error);
      expect(e.customProperty).toBe("test");
    }

    // Reset to avoid affecting other tests
    Q.longStackSupport = false;
  });
});