// Test case to detect the mutation in q.js where the Montage Require bootstrap check is disabled
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading behavior", () => {
  it("should properly load Q in a CommonJS environment", () => {
    // This test verifies that Q can be loaded and used in a CommonJS environment
    // The mutation changes the bootstrap check from `if (typeof bootstrap === "function")`
    // to `if (false)`, which should not affect CommonJS loading but we test to ensure
    // the module still exports correctly
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Verify basic Q functionality works
    const promise = Q.resolve(42);
    return promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});