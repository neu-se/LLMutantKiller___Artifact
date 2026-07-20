// Test case to detect the mutation in makeStackTraceLong function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should preserve stack traces when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will reject
    const error = new Error("Test error");
    const promiseChain = Q().then(() => {
      return Q.Promise((resolve, reject) => {
        setTimeout(() => {
          reject(error);
        }, 0);
      });
    });

    try {
      await promiseChain;
      fail("Promise should have rejected");
    } catch (e) {
      // Check that the error has a stack trace
      expect(e.stack).toBeDefined();
      // The stack should contain multiple frames showing the promise chain
      expect(e.stack.split('\n').length).toBeGreaterThan(2);
      // Should contain the "From previous event" separator if long stacks are working
      expect(e.stack).toContain("From previous event");
    } finally {
      // Clean up
      Q.longStackSupport = false;
    }
  });
});