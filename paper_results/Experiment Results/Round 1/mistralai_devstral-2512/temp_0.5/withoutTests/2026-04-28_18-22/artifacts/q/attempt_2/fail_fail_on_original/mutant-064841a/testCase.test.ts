import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack traces", () => {
  it("should include stack traces when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises to generate a stack trace
    const promise = Q.resolve().then(() => {
      throw new Error("Test error");
    });

    try {
      await promise;
      fail("Promise should have rejected");
    } catch (error: any) {
      // Check that the error has a stack trace
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe("string");
      expect(error.stack.length).toBeGreaterThan(0);
      // The stack should contain more than just the error message
      expect(error.stack.split("\n").length).toBeGreaterThan(1);
    }
  });
});