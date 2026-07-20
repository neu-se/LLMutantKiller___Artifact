describe("SES environment - ses.ok() returning false", () => {
  it("should not assign ses.makeQ when ses.ok() returns false", () => {
    // Save original globals
    const originalExports = (global as any).exports;
    const originalModule = (global as any).module;
    const originalDefine = (global as any).define;
    const originalSes = (global as any).ses;
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalBootstrap = (global as any).bootstrap;

    try {
      // Remove CommonJS, RequireJS, and browser globals so the SES branch is reached
      delete (global as any).exports;
      delete (global as any).module;
      delete (global as any).define;
      delete (global as any).window;
      delete (global as any).self;
      delete (global as any).bootstrap;

      // Set up a fake SES environment where ok() returns false
      const ses: { ok: () => boolean; makeQ?: any } = {
        ok: () => false,
      };
      (global as any).ses = ses;

      // Clear require cache so the module re-evaluates with the new globals
      const modulePath = require.resolve("../q.js");
      delete require.cache[modulePath];
      require("../q.js");

      // Original: early return prevents ses.makeQ from being set
      // Mutated: no early return, so ses.makeQ gets set
      expect(ses.makeQ).toBeUndefined();
    } finally {
      // Restore all globals
      if (originalExports !== undefined) {
        (global as any).exports = originalExports;
      } else {
        delete (global as any).exports;
      }
      if (originalModule !== undefined) {
        (global as any).module = originalModule;
      } else {
        delete (global as any).module;
      }
      if (originalDefine !== undefined) {
        (global as any).define = originalDefine;
      } else {
        delete (global as any).define;
      }
      if (originalSes !== undefined) {
        (global as any).ses = originalSes;
      } else {
        delete (global as any).ses;
      }
      if (originalWindow !== undefined) {
        (global as any).window = originalWindow;
      } else {
        delete (global as any).window;
      }
      if (originalSelf !== undefined) {
        (global as any).self = originalSelf;
      } else {
        delete (global as any).self;
      }
      if (originalBootstrap !== undefined) {
        (global as any).bootstrap = originalBootstrap;
      } else {
        delete (global as any).bootstrap;
      }

      // Restore require cache
      const modulePath = require.resolve("../q.js");
      delete require.cache[modulePath];
      require("../q.js");
    }
  });
});