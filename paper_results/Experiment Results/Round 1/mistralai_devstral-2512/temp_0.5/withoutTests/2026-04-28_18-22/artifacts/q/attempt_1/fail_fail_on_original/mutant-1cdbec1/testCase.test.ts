// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-1cdbec1/testCase.test.ts
import { Q } from "./q.js";

describe("Q library global export", () => {
  it("should export Q to global scope when window is defined but self is undefined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    // Setup environment where window is defined but self is undefined
    global.window = {};
    delete global.self;

    // Clear any existing Q global and load the module
    delete global.Q;
    const qModule = require("./q.js");

    // Verify Q is exported to window
    expect(global.window.Q).toBeDefined();
    expect(global.window.Q).toBe(qModule);

    // Cleanup
    global.window = originalWindow;
    global.self = originalSelf;
    global.Q = originalQ;
  });
});