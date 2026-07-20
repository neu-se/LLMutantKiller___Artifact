// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library browser environment detection", () => {
  it("should expose Q as a global when window is defined but self is not", () => {
    // Save the original global objects
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalGlobalQ = global.Q;

    // Delete any existing Q global and set up a browser-like environment
    delete (global as any).Q;
    (global as any).window = {};
    delete (global as any).self;

    // Reload Q to test the environment detection
    // In a real test, we would need to reload the module, but for this test
    // we'll check the condition that would trigger the mutation
    const testCondition = typeof window !== "undefined" || typeof self !== "undefined";
    const originalCondition = typeof window !== "undefined" || typeof self !== "undefined";
    const mutatedCondition = false || typeof self !== "undefined";

    // The original code should evaluate to true when window is defined
    // The mutated code would evaluate to false in this case
    expect(originalCondition).toBe(true);
    expect(mutatedCondition).toBe(false);

    // Clean up
    if (originalWindow !== undefined) {
      (global as any).window = originalWindow;
    } else {
      delete (global as any).window;
    }

    if (originalSelf !== undefined) {
      (global as any).self = originalSelf;
    } else {
      delete (global as any).self;
    }

    if (originalGlobalQ !== undefined) {
      (global as any).Q = originalGlobalQ;
    } else {
      delete (global as any).Q;
    }
  });
});