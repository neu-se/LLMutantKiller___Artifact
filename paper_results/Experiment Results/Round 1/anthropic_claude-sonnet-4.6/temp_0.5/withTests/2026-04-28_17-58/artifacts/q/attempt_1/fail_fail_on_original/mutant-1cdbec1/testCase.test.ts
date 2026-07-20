import { createRequire } from "module";
import { Module } from "module";

describe("Q browser global path", () => {
  it("should load when only window is defined (not self)", () => {
    // Simulate an environment where window is defined but self is not
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    
    try {
      delete (global as any).window;
      delete (global as any).self;
      
      // Set window but not self
      (global as any).window = {};
      
      // Re-require the module to test the browser path
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // Q should be defined on window (original uses ||, so window-only works)
      expect((global as any).window.Q).toBeDefined();
    } finally {
      (global as any).window = originalWindow;
      (global as any).self = originalSelf;
    }
  });
});