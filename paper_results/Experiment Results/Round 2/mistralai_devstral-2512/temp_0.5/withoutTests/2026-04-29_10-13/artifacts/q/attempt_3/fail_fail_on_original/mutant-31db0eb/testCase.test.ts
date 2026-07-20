const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate detection", () => {
  it("should use setImmediate when available in non-window environments", (done) => {
    // Save original setImmediate and window
    const originalSetImmediate = global.setImmediate;
    const originalWindow = global.window;

    // Setup test environment
    global.window = undefined;
    let setImmediateCalled = false;
    global.setImmediate = function(fn: Function) {
      setImmediateCalled = true;
      setTimeout(fn, 0);
      return { unref: () => {} };
    };

    // Create a promise and verify setImmediate is used
    Q.resolve("test").then(() => {
      // In original code, setImmediate should be called in non-window environments
      // In mutated code, it will always use setImmediate regardless of window
      expect(setImmediateCalled).toBe(true);

      // Restore environment
      global.setImmediate = originalSetImmediate;
      global.window = originalWindow;
      done();
    }).catch((err: any) => {
      // Restore environment
      global.setImmediate = originalSetImmediate;
      global.window = originalWindow;
      done(err);
    });

    // Safety timeout
    setTimeout(() => {
      global.setImmediate = originalSetImmediate;
      global.window = originalWindow;
      done.fail("Test timed out");
    }, 200);
  });
});