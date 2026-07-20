import { describe, it, expect } from "@jest/globals";

describe("SES environment - ses.ok() returns false", () => {
  it("should not set ses.makeQ when ses.ok() returns false", () => {
    // Save original globals
    const originalSes = (global as any).ses;
    const originalModule = (global as any).module;
    const originalExports = (global as any).exports;
    const originalDefine = (global as any).define;
    const originalBootstrap = (global as any).bootstrap;

    try {
      // Remove CommonJS and other module system globals so the SES branch is reached
      delete (global as any).module;
      delete (global as any).exports;
      delete (global as any).define;
      delete (global as any).bootstrap;

      // Set up a fake SES environment where ok() returns false
      const ses = {
        ok: () => false,
        makeQ: undefined as any,
      };
      (global as any).ses = ses;

      // Clear require cache so the module re-executes
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      // Re-require the module in the SES environment
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code: when ses.ok() returns false, we return early,
      // so ses.makeQ should NOT be set (remains undefined).
      // In the mutated code: the early return is removed, so ses.makeQ WILL be set.
      expect(ses.makeQ).toBeUndefined();
    } finally {
      // Restore globals
      if (originalSes !== undefined) {
        (global as any).ses = originalSes;
      } else {
        delete (global as any).ses;
      }
      if (originalModule !== undefined) {
        (global as any).module = originalModule;
      }
      if (originalExports !== undefined) {
        (global as any).exports = originalExports;
      }
      if (originalDefine !== undefined) {
        (global as any).define = originalDefine;
      }
      if (originalBootstrap !== undefined) {
        (global as any).bootstrap = originalBootstrap;
      }

      // Clean up require cache
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
    }
  });
});