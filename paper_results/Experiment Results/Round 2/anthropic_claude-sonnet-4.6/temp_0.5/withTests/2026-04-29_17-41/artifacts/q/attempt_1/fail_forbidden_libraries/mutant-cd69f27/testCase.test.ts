import { describe, it, expect } from "@jest/globals";

describe("SES environment ses.ok() returning false", () => {
  it("should not set ses.makeQ when ses.ok() returns false", () => {
    // Save original globals
    const originalExports = (global as any).exports;
    const originalModule = (global as any).module;
    const originalDefine = (global as any).define;
    const originalSes = (global as any).ses;
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalBootstrap = (global as any).bootstrap;

    try {
      // Remove CommonJS, RequireJS, browser globals so SES branch is reached
      delete (global as any).exports;
      delete (global as any).module;
      delete (global as any).define;
      delete (global as any).window;
      delete (global as any).self;
      delete (global as any).bootstrap;

      // Set up SES environment with ok() returning false
      const ses: { ok: () => boolean; makeQ?: any } = {
        ok: () => false,
        makeQ: undefined,
      };
      (global as any).ses = ses;

      // Re-require the module to trigger the SES branch
      // We need to clear the require cache first
      const modulePath = require.resolve("../q.js");
      delete require.cache[modulePath];

      require("../q.js");

      // In the original code, when ses.ok() returns false, we return early
      // and ses.makeQ should NOT be set (remains undefined).
      // In the mutated code, the early return is removed, so ses.makeQ WILL be set.
      expect(ses.makeQ).toBeUndefined();
    } finally {
      // Restore globals
      if (originalExports !== undefined) {
        (global as any).exports = originalExports;
      }
      if (originalModule !== undefined) {
        (global as any).module = originalModule;
      }
      if (originalDefine !== undefined) {
        (global as any).define = originalDefine;
      }
      if (originalSes !== undefined) {
        (global as any).ses = originalSes;
      } else {
        delete (global as any).ses;
      }
      if (originalWindow !== undefined) {
        (global as any).window = originalWindow;
      }
      if (originalSelf !== undefined) {
        (global as any).self = originalSelf;
      }
      if (originalBootstrap !== undefined) {
        (global as any).bootstrap = originalBootstrap;
      }

      // Restore require cache
      const modulePath = require.resolve("../q.js");
      delete require.cache[modulePath];
      require("../q.js");
    }
  });
});