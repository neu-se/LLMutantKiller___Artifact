const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate window binding", () => {
  it("should conditionally bind setImmediate based on window availability", (done) => {
    // Save original window
    const originalWindow = global.window;

    // Test with window defined
    global.window = { setImmediate: jest.fn() } as any;
    let bindCallCount = 0;

    // Override Function.prototype.bind to track calls
    const originalBind = Function.prototype.bind;
    Function.prototype.bind = function(thisArg: any) {
      if (thisArg === global.window) {
        bindCallCount++;
      }
      return originalBind.apply(this, arguments as any);
    };

    // Force re-evaluation of the module
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Q1.resolve("test1").then(() => {
      // In original code, when window is defined, bind should be called once
      expect(bindCallCount).toBe(1);

      // Now test without window
      Function.prototype.bind = originalBind;
      global.window = undefined;
      bindCallCount = 0;

      // Force re-evaluation again
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

      Q2.resolve("test2").then(() => {
        // In original code, when window is undefined, bind should NOT be called
        expect(bindCallCount).toBe(0);

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
      done(new Error("Test timed out"));
    }, 500);
  });
});