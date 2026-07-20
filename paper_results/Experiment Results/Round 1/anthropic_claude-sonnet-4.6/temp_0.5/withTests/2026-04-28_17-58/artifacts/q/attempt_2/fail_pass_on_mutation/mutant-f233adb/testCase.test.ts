describe("ses environment - early return when ses.ok() is false", () => {
  it("should not assign Q to window when ses is defined and ses.ok() returns false", () => {
    const g = global as any;

    // Save originals
    const originalSes = g.ses;
    const originalWindow = g.window;
    const originalSelf = g.self;
    const originalModule = g.module;
    const originalDefine = g.define;

    // Remove CommonJS module so that branch is not taken
    delete g.module;
    // Remove RequireJS define so that branch is not taken
    delete g.define;
    // Remove self so only window branch matters
    delete g.self;

    // Set up ses with ok() returning false
    g.ses = {
      ok: () => false,
      makeQ: undefined as any,
    };

    // Set up a fake window to observe if Q gets assigned
    let qWasAssigned = false;
    const fakeWindow: any = {};
    Object.defineProperty(fakeWindow, "Q", {
      set(_val: any) {
        qWasAssigned = true;
      },
      get() {
        return undefined;
      },
      configurable: true,
    });
    g.window = fakeWindow;

    try {
      // Re-require the module fresh
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Original: ses.ok() is false → early return → window.Q never assigned
      // Mutated:  ses block is empty → falls through to window branch → window.Q IS assigned
      expect(qWasAssigned).toBe(false);
    } finally {
      // Restore everything
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