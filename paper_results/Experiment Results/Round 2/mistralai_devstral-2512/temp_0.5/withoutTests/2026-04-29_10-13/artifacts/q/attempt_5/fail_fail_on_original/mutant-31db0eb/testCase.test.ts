const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate binding behavior", () => {
  it("should bind setImmediate to window when window is defined", (done) => {
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

    // Track if bind was called with window
    let bindCalledWithWindow = false;
    const originalBind = Function.prototype.bind;
    Function.prototype.bind = function(thisArg: any) {
      if (thisArg === mockWindow) {
        bindCalledWithWindow = true;
      }
      return originalBind.apply(this, arguments as any);
    };

    // Force re-evaluation of the module
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Q1.resolve("test").then(() => {
      // In original code, when window is defined, setImmediate.bind(window, flush) should be called
      expect(bindCalledWithWindow).toBe(true);

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
      done("Test timed out");
    }, 200);
  });
});