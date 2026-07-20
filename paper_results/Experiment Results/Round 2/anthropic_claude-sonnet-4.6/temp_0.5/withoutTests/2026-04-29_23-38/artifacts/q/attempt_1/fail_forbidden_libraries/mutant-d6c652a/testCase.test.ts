import { createRequire } from "module";
import { describe, it, expect } from "@jest/globals";

describe("captureLine behavior when hasStacks is false", () => {
  it("should not throw when hasStacks is false (original returns early)", () => {
    // Mock Error to simulate environment without stacks
    const originalError = global.Error;
    const MockError = function() { return {}; } as any;
    MockError.prototype = originalError.prototype;
    global.Error = MockError;
    
    try {
      // Re-require the module with mocked Error
      jest.resetModules();
      expect(() => require("../../../../../../../../../../../subject_repositories/q/q.js")).not.toThrow();
    } finally {
      global.Error = originalError;
    }
  });
});