// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-412ad73/testCase.test.ts
import { Q } from "./q.js";

describe("Q library bootstrap detection", () => {
  it("should correctly detect and use bootstrap function when available", () => {
    // Create a mock bootstrap function to verify it's being called
    const mockBootstrap = jest.fn();
    global.bootstrap = mockBootstrap;

    // Re-import Q to ensure the module initialization runs with our mock
    delete require.cache[require.resolve("./q.js")];
    const { Q: FreshQ } = require("./q.js");

    // Verify that bootstrap was called with expected arguments
    expect(mockBootstrap).toHaveBeenCalledWith("promise", expect.any(Function));

    // Clean up
    delete global.bootstrap;
  });
});