import { describe, it, expect } from "@jest/globals";

describe("Q browser global loading", () => {
  it("should load Q when window is defined but self is not defined", () => {
    // Simulate a browser-like environment where window exists but self does not
    // by temporarily setting global.window and ensuring global.self is undefined
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalModule = (global as any).module;
    const originalExports = (global as any).exports;

    try {
      // Remove CommonJS module system to force browser path
      delete (global as any).module;
      delete (global as any).exports;

      // Set window but not self
      (global as any).window = {};
      delete (global as any).self;

      // Re-require the module - clear cache first
      const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];

      // This should work in original (window is defined), but fail in mutated (false || self check)
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code, Q should be set on global.window
      expect((global as any).window.Q).toBeDefined();
      expect(typeof (global as any).window.Q).toBe("function");
    } finally {
      (global as any).window = originalWindow;
      (global as any).self = originalSelf;
      (global as any).module = originalModule;
      (global as any).exports = originalExports;
    }
  });
});