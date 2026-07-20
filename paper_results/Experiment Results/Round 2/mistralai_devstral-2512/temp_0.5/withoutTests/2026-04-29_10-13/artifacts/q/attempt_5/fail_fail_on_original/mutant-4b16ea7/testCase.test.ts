import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library setImmediate detection", () => {
  it("should use setImmediate when available in browser environment", (done) => {
    // Save original environment
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;
    let setImmediateUsed = false;

    // Create a mock browser environment with setImmediate
    global.window = {
      setImmediate: function(callback: () => void) {
        setImmediateUsed = true;
        return setTimeout(callback, 0) as any;
      }
    } as any;

    global.setImmediate = global.window.setImmediate;

    // Create a promise and verify setImmediate is used
    Q.resolve("test").then((result: string) => {
      expect(result).toBe("test");
      expect(setImmediateUsed).toBe(true);

      // Restore original environment
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;

      done();
    });
  });
});