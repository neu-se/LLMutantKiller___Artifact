describe("SES environment ses.ok() returns false", () => {
  it("should not assign ses.makeQ when ses.ok() returns false", () => {
    // Save original globals
    const originalSes = (global as any).ses;
    const originalModule = (global as any).module;
    const originalExports = (global as any).exports;
    const originalDefine = (global as any).define;
    const originalBootstrap = (global as any).bootstrap;

    let modulePath: string;

    try {
      // Remove module system globals so the SES branch is reached
      delete (global as any).module;
      delete (global as any).exports;
      delete (global as any).define;
      delete (global as any).bootstrap;

      // Set up a fake SES environment where ok() returns false
      const ses: { ok: () => boolean; makeQ: any } = {
        ok: () => false,
        makeQ: undefined,
      };
      (global as any).ses = ses;

      // Clear require cache so the module re-executes
      modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Original: ses.ok() === false => return early => ses.makeQ stays undefined
      // Mutated:  ses.ok() === false => empty if body => else runs => ses.makeQ is set
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

      // Restore require cache entry
      try {
        const mp = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
        delete require.cache[mp];
      } catch (_) {}
    }
  });
});