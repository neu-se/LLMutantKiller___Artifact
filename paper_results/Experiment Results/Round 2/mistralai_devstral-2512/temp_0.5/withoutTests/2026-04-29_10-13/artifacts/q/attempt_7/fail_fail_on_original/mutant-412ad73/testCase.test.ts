// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_7/pending_category/mutant-412ad73/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library bootstrap function detection", () => {
  it("should call bootstrap function when available in global scope", () => {
    // Create a spy to track bootstrap calls
    const bootstrapSpy = jest.fn();
    (global as any).bootstrap = bootstrapSpy;

    // Force re-evaluation of the module to trigger bootstrap detection
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify bootstrap was called with correct parameters
    expect(bootstrapSpy).toHaveBeenCalledWith("promise", expect.any(Function));

    // Clean up
    delete (global as any).bootstrap;
  });
});