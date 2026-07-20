// Test case to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library global exposure", () => {
  it("should expose Q globally in browser environment with window but no self", () => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Clean up
    delete (global as any).window;
    delete (global as any).self;
    delete (global as any).Q;

    // Set up test environment - window exists but self doesn't
    (global as any).window = {};

    // Clear require cache and reload Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q was exposed globally (original behavior)
    expect((global as any).Q).toBeDefined();
    expect((global as any).Q).toBe(freshQ);

    // Clean up
    if (originalWindow !== undefined) {
      (global as any).window = originalWindow;
    }
    if (originalSelf !== undefined) {
      (global as any).self = originalSelf;
    }
    if (originalQ !== undefined) {
      (global as any).Q = originalQ;
    } else {
      delete (global as any).Q;
    }
  });
});