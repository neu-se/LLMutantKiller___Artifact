// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-1cdbec1/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library global export behavior", () => {
  it("should export Q to global scope when only window is defined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    // Setup environment where only window is defined (self is undefined)
    global.window = {};
    delete (global as any).self;

    // Clear any existing Q global
    delete (global as any).Q;

    // Load Q which should export to window
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is exported to window
    expect((global.window as any).Q).toBeDefined();
    expect((global.window as any).Q).toBe(qModule);

    // Cleanup
    global.window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});