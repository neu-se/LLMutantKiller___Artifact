describe("ses environment handling", () => {
  it("should assign definition to ses.makeQ when ses is defined and ses.ok() returns true", () => {
    const g = global as any;

    const originalSes = g.ses;
    const originalWindow = g.window;
    const originalSelf = g.self;
    const originalModule = g.module;
    const originalDefine = g.define;

    // Remove CommonJS module so that branch is not taken
    delete g.module;
    // Remove RequireJS define
    delete g.define;
    // Remove window and self so those branches are not taken
    delete g.window;
    delete g.self;

    // Set up ses with ok() returning true
    const fakeSes: any = {
      ok: () => true,
      makeQ: undefined,
    };
    g.ses = fakeSes;

    try {
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Original: ses.ok() is true → ses.makeQ = definition (a function)
      // Mutated:  ses block is empty → ses.makeQ remains undefined
      expect(typeof fakeSes.makeQ).toBe("function");
    } finally {
      if (originalSes === undefined) delete g.ses;
      else g.ses = originalSes;

      if (originalWindow === undefined) delete g.window;
      else g.window = originalWindow;

      if (originalSelf === undefined) delete g.self;
      else g.self = originalSelf;

      if (originalModule === undefined) delete g.module;
      else g.module = originalModule;

      if (originalDefine === undefined) delete g.define;
      else g.define = originalDefine;

      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
    }
  });
});