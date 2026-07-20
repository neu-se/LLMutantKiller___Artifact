// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_4/pending_category/mutant-1cdbec1/testCase.test.ts
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library global export behavior", () => {
  it("should export Q to window when only window is defined", () => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Setup environment where only window is defined (self is undefined)
    (global as any).window = {};
    delete (global as any).self;

    // Clear any existing Q global
    delete (global as any).Q;

    // Re-require to trigger the global export logic
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is exported to window
    expect((global as any).window.Q).toBeDefined();
    expect((global as any).window.Q).toBe(q);

    // Cleanup
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});