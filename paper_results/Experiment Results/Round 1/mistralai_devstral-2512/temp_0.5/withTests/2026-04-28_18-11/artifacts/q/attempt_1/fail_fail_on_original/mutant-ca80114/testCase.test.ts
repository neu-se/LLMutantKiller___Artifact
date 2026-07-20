// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should handle errors differently in Node.js vs browser environments", async () => {
    // This test relies on the fact that the mutation changes the condition
    // from `if (isNodeJS)` to `if (true)`, which affects error handling behavior

    // In the original code, errors in Node.js are thrown synchronously
    // In the mutated code, errors are always thrown synchronously (Node.js behavior)
    // We can detect this by checking if an error is thrown synchronously in a browser-like environment

    let errorThrown = false;
    let error: Error | null = null;

    // Simulate a browser environment where isNodeJS would be false
    const originalProcess = global.process;
    delete (global as any).process;

    try {
      Q.nextTick(() => {
        throw new Error("Test error");
      });

      // In the original code (browser), this would not throw immediately
      // In the mutated code, it will throw immediately (Node.js behavior)
      await new Promise(resolve => setTimeout(resolve, 10));
    } catch (e) {
      errorThrown = true;
      error = e as Error;
    } finally {
      global.process = originalProcess;
    }

    // In the original code, errorThrown should be false (async error in browser)
    // In the mutated code, errorThrown should be true (sync error like Node.js)
    expect(errorThrown).toBe(false);
  });
});