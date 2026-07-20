// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5095899/testCase.test.ts

describe("Q global initialization", () => {
  it("should expose Q as a global when self is defined but window is undefined", () => {
    // Save the original global state
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Delete existing globals to simulate a clean environment
    delete (global as any).window;
    delete (global as any).self;
    delete (global as any).Q;

    // Create mock self object but no window
    (global as any).self = {};

    // Load Q in this environment
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is available on self
    expect((global as any).self.Q).toBeDefined();
    expect(typeof (global as any).self.Q).toBe("function");

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});