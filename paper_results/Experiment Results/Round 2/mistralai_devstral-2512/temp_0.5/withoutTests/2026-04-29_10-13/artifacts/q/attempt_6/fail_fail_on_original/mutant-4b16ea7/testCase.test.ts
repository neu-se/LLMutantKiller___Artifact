import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library setImmediate detection", () => {
  it("should correctly detect and use setImmediate when available", (done) => {
    // Mock a browser environment with setImmediate
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;
    let setImmediateCalled = false;

    global.window = {
      setImmediate: function(callback: () => void) {
        setImmediateCalled = true;
        // Use setTimeout to simulate setImmediate
        return setTimeout(callback, 0) as any;
      }
    } as any;

    global.setImmediate = global.window.setImmediate;

    // Test that promises work and setImmediate is used
    Q.resolve("test").then((result: string) => {
      expect(result).toBe("test");
      expect(setImmediateCalled).toBe(true);

      // Restore original environment
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;

      done();
    }).catch((error: any) => {
      // Restore original environment
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;
      done(error);
    });
  });
});