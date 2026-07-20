// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5095899/testCase.test.ts

describe("Q global initialization", () => {
  it("should expose Q as a global when neither window nor self are defined", () => {
    // Save the original global state
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Delete existing globals to simulate a clean environment
    delete (global as any).window;
    delete (global as any).self;
    delete (global as any).Q;

    // Load Q in this environment
    let errorThrown = false;
    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      errorThrown = true;
      expect(e.message).toContain("This environment was not anticipated by Q");
    }

    // Verify that an error was thrown
    expect(errorThrown).toBe(true);

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});