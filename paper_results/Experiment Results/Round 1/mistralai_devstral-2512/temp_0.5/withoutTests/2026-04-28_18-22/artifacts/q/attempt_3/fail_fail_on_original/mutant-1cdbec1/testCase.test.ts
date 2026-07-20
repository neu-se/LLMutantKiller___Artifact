// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_3/pending_category/mutant-1cdbec1/testCase.test.ts
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library global export", () => {
  it("should export Q to window when only window is defined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    // Setup environment where only window is defined (self is undefined)
    global.window = {};
    delete global.self;

    // Clear any existing Q global
    delete global.Q;

    // Re-require to trigger the global export logic
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is exported to window
    expect(global.window.Q).toBeDefined();
    expect(global.window.Q).toBe(q);

    // Cleanup
    global.window = originalWindow;
    global.self = originalSelf;
    global.Q = originalQ;
  });
});