describe("SES environment ses.ok() returns false - no early return", () => {
  it("should not assign ses.makeQ when ses.ok() returns true", () => {
    const originalSes = (global as any).ses;
    const originalModule = (global as any).module;
    const originalExports = (global as any).exports;
    const originalDefine = (global as any).define;
    const originalBootstrap = (global as any).bootstrap;
    const originalWindow = (global as any).window;

    try {
      delete (global as any).module;
      delete (global as any).exports;
      delete (global as any).define;
      delete (global as any).bootstrap;
      delete (global as any).window;

      // ses.ok() returns false means !ses.ok() is true
      // Original: enters if-block, hits return, stops execution
      // Mutated: enters if-block (empty), no return, continues past if/else
      // After the if/else, the next branch checks window/self - but those are gone
      // So mutated code would throw "This environment was not anticipated by Q"
      const ses: { ok: () => boolean; makeQ: any } = {
        ok: () => false,
        makeQ: undefined,
      };
      (global as any).ses = ses;

      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      let threw = false;
      try {
        require("../../../../../../../../../../../subject_repositories/q/q.js");
      } catch (e) {
        threw = true;
      }

      // Original: ses.ok() false => return early => no error thrown
      // Mutated: ses.ok() false => no return => falls through to window check => throws
      expect(threw).toBe(false);
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
      if (originalWindow !== undefined) {
        (global as any).window = originalWindow;
      }

      try {
        const mp = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
        delete require.cache[mp];
      } catch (_) {}
    }
  });
});