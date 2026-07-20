// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5095899/testCase.test.ts

import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q global initialization", () => {
  it("should expose Q as a global in browser-like environments with window but no self", () => {
    // Save the original global state
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    // Delete existing globals to simulate a clean environment
    delete global.window;
    delete global.self;
    delete global.Q;

    // Create a mock window object without self
    global.window = {};

    // Load Q in this environment
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is available on window
    expect(global.window.Q).toBeDefined();
    expect(typeof global.window.Q).toBe("function");

    // Clean up
    global.window = originalWindow;
    global.self = originalSelf;
    global.Q = originalQ;
  });
});