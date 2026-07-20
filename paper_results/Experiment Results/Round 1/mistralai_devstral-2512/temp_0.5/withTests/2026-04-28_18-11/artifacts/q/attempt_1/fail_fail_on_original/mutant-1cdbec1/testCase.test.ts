// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-1cdbec1/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q global initialization", () => {
  it("should initialize Q globally in a window-like environment with only window defined", () => {
    // Save the original global state
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    // Clear any existing Q global
    delete global.Q;

    // Create a mock window-like environment where only window is defined
    global.window = {};
    delete global.self;

    // Load Q in this environment
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const Q = qModule;

    // Verify Q was initialized globally
    expect(global.Q).toBeDefined();
    expect(global.Q).toBe(Q);

    // Restore original global state
    global.window = originalWindow;
    global.self = originalSelf;
    global.Q = originalQ;
  });
});