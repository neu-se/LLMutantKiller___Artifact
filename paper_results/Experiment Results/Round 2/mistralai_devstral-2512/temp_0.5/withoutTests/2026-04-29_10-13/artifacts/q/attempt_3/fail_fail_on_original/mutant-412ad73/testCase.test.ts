// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_3/pending_category/mutant-412ad73/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library bootstrap behavior", () => {
  it("should correctly handle bootstrap function when available", () => {
    // Create a mock bootstrap function
    const originalBootstrap = global.bootstrap;
    const mockBootstrap = jest.fn();

    // Set up the mock
    global.bootstrap = mockBootstrap;

    // Clear module cache and reload Q to trigger initialization
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify bootstrap was called with correct arguments
    expect(mockBootstrap).toHaveBeenCalledTimes(1);
    expect(mockBootstrap).toHaveBeenCalledWith("promise", expect.any(Function));

    // Restore original bootstrap if it existed
    if (originalBootstrap !== undefined) {
      global.bootstrap = originalBootstrap;
    } else {
      delete global.bootstrap;
    }
  });
});