// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_3/pending_category/mutant-22bddba/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library global export", () => {
  it("should export Q as a global when running in a browser-like environment with window but without self", () => {
    // Simulate a browser-like environment with window but without self
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    // Setup environment: window exists, self does not
    globalAny.window = {};
    delete globalAny.self;

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is exported as a global
    expect(globalAny.window.Q).toBeDefined();
    expect(typeof globalAny.window.Q).toBe('function');

    // Cleanup
    globalAny.window = originalWindow;
    globalAny.self = originalSelf;
  });
});