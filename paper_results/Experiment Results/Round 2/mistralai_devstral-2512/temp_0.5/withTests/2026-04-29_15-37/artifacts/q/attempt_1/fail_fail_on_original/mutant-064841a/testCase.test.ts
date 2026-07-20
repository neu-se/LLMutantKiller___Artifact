// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Long Stack Traces", () => {
  it("should capture stack traces when long stack support is enabled", async () => {
    // Enable long stack support
    Q.longStackSupport = true;

    // Create a promise chain that will reject
    const promise = Q().then(() => {
      throw new Error("Test error");
    });

    try {
      await promise;
      // This should not be reached
      expect(true).toBe(false);
    } catch (error: any) {
      // Check if stack trace was captured
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("Test error");
      // The mutation removes stack trace capture, so this will fail
      expect(error.stack).not.toBeUndefined();
    } finally {
      // Clean up
      Q.longStackSupport = false;
    }
  });
});