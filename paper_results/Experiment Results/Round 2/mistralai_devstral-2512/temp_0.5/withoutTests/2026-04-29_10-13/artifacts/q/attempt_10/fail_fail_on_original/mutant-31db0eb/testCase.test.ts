const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate window binding behavior", () => {
  it("should use window.setImmediate when window is available", (done) => {
    // Save original window and setImmediate
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;

    // Create a mock window with setImmediate
    const mockWindow = {
      setImmediate: jest.fn((fn: Function) => {
        setTimeout(fn, 0);
        return { unref: () => {} };
      })
    };
    global.window = mockWindow as any;

    // Track which setImmediate is being used
    let windowSetImmediateUsed = false;
    global.setImmediate = jest.fn((fn: Function) => {
      setTimeout(fn, 0);
      return { unref: () => {} };
    });

    // Override the setImmediate binding detection
    const originalBind = Function.prototype.bind;
    Function.prototype.bind = function(thisArg: any) {
      if (thisArg === mockWindow) {
        // Return a function that uses window.setImmediate
        return () => {
          windowSetImmediateUsed = true;
          mockWindow.setImmediate(flush);
        };
      }
      return originalBind.apply(this, arguments as any);
    };

    // Force re-evaluation of the module
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Get reference to the internal flush function
    const nextTickModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const flush = nextTickModule.__test__getFlush || (() => {});

    Q1.resolve("test").then(() => {
      // In original code, when window is defined, window.setImmediate should be used
      expect(windowSetImmediateUsed).toBe(true);
      expect(mockWindow.setImmediate).toHaveBeenCalled();

      // Restore environment
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;
      Function.prototype.bind = originalBind;
      done();
    }).catch((err: any) => {
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;
      Function.prototype.bind = originalBind;
      done(err);
    });

    // Safety timeout
    setTimeout(() => {
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;
      Function.prototype.bind = originalBind;
      done(new Error("Test timed out"));
    }, 500);
  });
});