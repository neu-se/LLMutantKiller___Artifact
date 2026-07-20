import { describe, it, expect } from "@jest/globals";

describe("Q module loading with window defined but self undefined", () => {
  it("should load Q and expose noConflict when window is defined but self is not", () => {
    // Save originals
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalExports = (global as any).exports;
    const originalModule = (global as any).module;

    try {
      // Simulate browser-like environment where window is defined but self is not
      // and there's no CommonJS module system
      (global as any).window = { Q: undefined };
      delete (global as any).self;
      delete (global as any).exports;
      delete (global as any).module;

      // Re-require the module fresh
      jest.resetModules();
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original: window is defined, so Q gets set on window
      // In mutated: false || typeof self !== "undefined" = false, so Q does NOT get set
      expect((global as any).window.Q).toBeDefined();
    } finally {
      (global as any).window = originalWindow;
      (global as any).self = originalSelf;
      (global as any).exports = originalExports;
      (global as any).module = originalModule;
      jest.resetModules();
    }
  });
});