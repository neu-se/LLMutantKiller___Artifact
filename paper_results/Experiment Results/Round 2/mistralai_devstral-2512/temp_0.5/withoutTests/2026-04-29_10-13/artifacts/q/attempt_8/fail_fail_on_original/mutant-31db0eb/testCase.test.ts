const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate environment detection", () => {
  it("should use different setImmediate binding strategies based on window availability", (done) => {
    // Save original window
    const originalWindow = global.window;

    // Test with window defined
    global.window = { setImmediate: () => {} } as any;
    let windowBindUsed = false;
    let fallbackBindUsed = false;

    // Override Function.prototype.bind to track calls
    const originalBind = Function.prototype.bind;
    Function.prototype.bind = function(thisArg: any, ...args: any[]) {
      if (thisArg === global.window) {
        windowBindUsed = true;
      } else if (args.length === 0) {
        fallbackBindUsed = true;
      }
      return originalBind.apply(this, [thisArg, ...args]);
    };

    // Force re-evaluation of the module
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Q1.resolve("test1").then(() => {
      // In original code, when window is defined, window.bind should be used
      expect(windowBindUsed).toBe(true);
      expect(fallbackBindUsed).toBe(false);

      // Now test without window
      Function.prototype.bind = originalBind;
      global.window = undefined;
      windowBindUsed = false;
      fallbackBindUsed = false;

      // Force re-evaluation again
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

      Q2.resolve("test2").then(() => {
        // In original code, when window is undefined, fallback should be used
        expect(windowBindUsed).toBe(false);
        expect(fallbackBindUsed).toBe(true);

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