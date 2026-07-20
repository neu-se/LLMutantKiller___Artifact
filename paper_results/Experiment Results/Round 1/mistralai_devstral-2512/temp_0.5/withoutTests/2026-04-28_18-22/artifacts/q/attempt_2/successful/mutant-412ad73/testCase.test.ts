// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-412ad73/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library bootstrap detection", () => {
  it("should properly detect and use bootstrap function when available", () => {
    // Create a mock bootstrap function to verify it's being called
    const mockBootstrap = jest.fn();
    (global as any).bootstrap = mockBootstrap;

    // Re-import Q to ensure the bootstrap detection runs fresh
    // We need to clear the module cache first
    jest.resetModules();
    const FreshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify that bootstrap was called with the expected arguments
    expect(mockBootstrap).toHaveBeenCalledWith("promise", expect.any(Function));

    // Clean up
    delete (global as any).bootstrap;
  });
});