import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library setImmediate detection", () => {
  it("should correctly detect and use setImmediate when available", (done) => {
    // Mock a browser environment with setImmediate
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;
    let setImmediateUsed = false;

    // Mock window and setImmediate
    global.window = {
      setImmediate: function(callback: () => void) {
        setImmediateUsed = true;
        // Use setTimeout to simulate setImmediate
        return setTimeout(callback, 0) as any;
      }
    } as any;

    // Force Q to recognize setImmediate by setting it globally
    global.setImmediate = global.window.setImmediate;

    // Create a deferred promise to test the scheduling mechanism
    const deferred = Q.defer();
    const startTime = Date.now();

    // Set up a timeout to detect if setImmediate wasn't used
    const timeout = setTimeout(() => {
      if (!setImmediateUsed) {
        // Restore original environment
        global.window = originalWindow;
        global.setImmediate = originalSetImmediate;
        done(new Error("setImmediate was not used"));
      }
    }, 100);

    // Resolve after a small delay to ensure async behavior
    setTimeout(() => {
      deferred.resolve("test");
    }, 10);

    // Test that promises work and setImmediate is used
    deferred.promise.then((result: string) => {
      clearTimeout(timeout);
      expect(result).toBe("test");
      expect(setImmediateUsed).toBe(true);

      // Restore original environment
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;

      done();
    }).catch((error: any) => {
      clearTimeout(timeout);
      // Restore original environment
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;
      done(error);
    });
  });
});