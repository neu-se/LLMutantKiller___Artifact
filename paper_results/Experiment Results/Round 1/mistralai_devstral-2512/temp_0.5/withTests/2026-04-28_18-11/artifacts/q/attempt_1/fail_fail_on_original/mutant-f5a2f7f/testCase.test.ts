import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine behavior", () => {
  it("should correctly capture line number when hasStacks is true", () => {
    // This test verifies that the captureLine function behaves correctly
    // when hasStacks is true. The mutation changes the condition from
    // `if (!hasStacks)` to `if (false)`, which means the early return
    // will never execute, potentially affecting stack trace filtering.

    // Create a promise chain that will generate stack traces
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error) => {
        // In the original code, the stack trace should be properly filtered
        // In the mutated code, the behavior might differ
        expect(error.stack).toBeDefined();
        // The stack should contain our test code, not Q internals
        expect(error.stack).not.toContain("q.js");
        return "recovered";
      });

    return promise;
  });
});