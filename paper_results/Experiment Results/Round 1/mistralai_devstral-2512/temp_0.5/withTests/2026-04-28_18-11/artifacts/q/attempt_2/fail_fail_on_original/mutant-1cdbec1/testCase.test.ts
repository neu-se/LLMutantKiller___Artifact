// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-1cdbec1/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q global initialization", () => {
  it("should initialize Q globally when only window is defined", () => {
    // Save the original global state
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Clear any existing Q global
    delete (global as any).Q;

    // Create a mock environment where only window is defined
    (global as any).window = {};
    delete (global as any).self;

    // Load Q in this environment
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q was initialized globally
    expect((global as any).Q).toBeDefined();
    expect((global as any).Q).toBe(qModule);

    // Restore original global state
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});