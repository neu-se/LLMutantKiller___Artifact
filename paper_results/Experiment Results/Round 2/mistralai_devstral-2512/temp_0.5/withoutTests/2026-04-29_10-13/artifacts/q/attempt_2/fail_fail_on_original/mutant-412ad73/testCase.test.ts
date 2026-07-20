// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-412ad73/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library module loading", () => {
  it("should expose Q as a global when loaded in browser-like environment", () => {
    // Simulate browser-like environment
    const mockWindow = {};
    global.window = mockWindow;

    // Clear the module cache and reload Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is available as a global
    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe('function');

    // Verify Q has expected methods
    expect(typeof mockWindow.Q.resolve).toBe('function');
    expect(typeof mockWindow.Q.reject).toBe('function');

    // Clean up
    delete global.window;
  });
});