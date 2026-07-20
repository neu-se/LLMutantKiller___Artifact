import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick error handling", () => {
  it("should demonstrate different error handling between Node.js and browser environments", async () => {
    // Test 1: Node.js environment (should throw synchronously in both original and mutated)
    const originalProcess = global.process;
    global.process = {
      nextTick: (callback: Function) => callback(),
      domain: null,
      toString: () => "[object process]"
    } as any;

    let nodeError: Error | null = null;
    try {
      Q.nextTick(() => {
        throw new Error("Node error");
      });
    } catch (e) {
      nodeError = e as Error;
    }

    // Test 2: Browser environment (should behave differently)
    delete (global as any).process;
    global.window = {} as any;

    let browserError: Error | null = null;
    let browserAsyncError: Error | null = null;

    // Set up async error handler
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = (error: Error) => {
      browserAsyncError = error;
    };

    try {
      Q.nextTick(() => {
        throw new Error("Browser error");
      });
    } catch (e) {
      browserError = e as Error;
    }

    // Wait a bit for async handling
    await new Promise(resolve => setTimeout(resolve, 10));

    // Restore environment
    global.process = originalProcess;
    global.window = undefined;
    (Q as any).onerror = originalOnerror;

    // In original code:
    // - Node.js: sync error (nodeError should exist)
    // - Browser: async error (browserAsyncError should exist, browserError should be null)
    // In mutated code:
    // - Both environments behave like Node.js (sync errors)
    expect(nodeError).not.toBeNull();
    expect(browserError).toBeNull();
    expect(browserAsyncError).not.toBeNull();
  });
});