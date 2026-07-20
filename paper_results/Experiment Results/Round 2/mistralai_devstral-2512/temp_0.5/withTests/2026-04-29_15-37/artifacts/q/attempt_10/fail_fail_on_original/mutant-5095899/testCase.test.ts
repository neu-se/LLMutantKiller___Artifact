// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5095899/testCase.test.ts

describe("Q global initialization", () => {
  it("should expose Q as a global when both window and self are defined", () => {
    // Save the original global state
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Delete existing globals to simulate a clean environment
    delete (global as any).window;
    delete (global as any).self;
    delete (global as any).Q;

    // Create mock window and self objects
    (global as any).window = {};
    (global as any).self = {};

    // Load Q in this environment
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is available on window (should prefer window over self)
    expect((global as any).window.Q).toBeDefined();
    expect(typeof (global as any).window.Q).toBe("function");

    // Verify Q is also available as a module export
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});