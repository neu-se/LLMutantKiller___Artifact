// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_5/pending_category/mutant-412ad73/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library bootstrap detection", () => {
  it("should detect when bootstrap function is available in Montage environment", () => {
    // Store original bootstrap if it exists
    const originalBootstrap = (global as any).bootstrap;

    // Create a mock bootstrap function
    const mockBootstrap = jest.fn();
    (global as any).bootstrap = mockBootstrap;

    // Clear module cache and reload Q to trigger initialization
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify bootstrap was called
    expect(mockBootstrap).toHaveBeenCalledWith("promise", expect.any(Function));

    // Restore original state
    if (originalBootstrap !== undefined) {
      (global as any).bootstrap = originalBootstrap;
    } else {
      delete (global as any).bootstrap;
    }
  });
});