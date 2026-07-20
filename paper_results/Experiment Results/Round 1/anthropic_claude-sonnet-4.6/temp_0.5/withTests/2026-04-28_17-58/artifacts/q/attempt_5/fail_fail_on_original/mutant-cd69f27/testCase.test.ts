describe("SES environment", () => {
  it("should assign ses.makeQ when ses.ok() returns true", () => {
    const originalSes = (global as any).ses;
    const originalModule = (global as any).module;
    const originalExports = (global as any).exports;
    const originalDefine = (global as any).define;
    const originalBootstrap = (global as any).bootstrap;

    try {
      delete (global as any).module;
      delete (global as any).exports;
      delete (global as any).define;
      delete (global as any).bootstrap;

      // ses.ok() returns true: !ses.ok() is false
      // Original: skips if, runs else => ses.makeQ = definition
      // Mutated: skips if (empty), runs else => ses.makeQ = definition
      // Both should set ses.makeQ - but let's verify the assigned value is a function
      const ses: { ok: () => boolean; makeQ: any } = {
        ok: () => true,
        makeQ: undefined,
      };
      (global as any).ses = ses;

      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // ses.makeQ should be set to the definition function
      expect(typeof ses.makeQ).toBe("function");

      // Calling ses.makeQ() should return the Q library with expected properties
      const Q = ses.makeQ();
      expect(typeof Q).toBe("function");
      expect(typeof Q.defer).toBe("function");
      expect(typeof Q.promise).toBe("function");
      expect(typeof Q.reject).toBe("function");
      expect(typeof Q.resolve).toBe("function");
    } finally {
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

      try {
        const mp = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
        delete require.cache[mp];
      } catch (_) {}
    }
  });
});