const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should correctly detect window availability for setImmediate binding", (done) => {
    // Save original window
    const originalWindow = global.window;

    // Test case 1: With window defined (browser-like environment)
    global.window = { setImmediate: jest.fn() };
    let bindCalled = false;
    const originalBind = Function.prototype.bind;
    Function.prototype.bind = function(context: any) {
      if (context === global.window && bindCalled === false) {
        bindCalled = true;
      }
      return originalBind.apply(this, arguments);
    };

    // Force re-evaluation of the nextTick implementation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Q1.resolve("test1").then(() => {
      // In original code with window defined, setImmediate.bind should be called
      expect(bindCalled).toBe(true);

      // Test case 2: Without window (Node.js-like environment)
      Function.prototype.bind = originalBind;
      global.window = undefined;
      bindCalled = false;

      // Force re-evaluation again
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

      Q2.resolve("test2").then(() => {
        // In original code without window, setImmediate.bind should NOT be called
        expect(bindCalled).toBe(false);

        // Restore environment
        global.window = originalWindow;
        Function.prototype.bind = originalBind;
        done();
      }).catch((err: any) => {
        global.window = originalWindow;
        Function.prototype.bind = originalBind;
        done(err);
      });
    }).catch((err: any) => {
      global.window = originalWindow;
      Function.prototype.bind = originalBind;
      done(err);
    });

    // Safety timeout
    setTimeout(() => {
      global.window = originalWindow;
      Function.prototype.bind = originalBind;
      done("Test timed out");
    }, 500);
  });
});