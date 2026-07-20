import { Q } from "./q";

describe("Q library setImmediate fallback", () => {
  it("should use setImmediate when available in non-Node environments", (done) => {
    // Mock a non-Node environment where setImmediate exists
    const originalProcess = global.process;
    const originalWindow = global.window;

    // Clean up global modifications
    delete global.process;
    global.window = {};

    // Mock setImmediate
    let setImmediateCalled = false;
    global.window.setImmediate = function(callback: Function) {
      setImmediateCalled = true;
      // Call the callback asynchronously
      setTimeout(() => callback(), 0);
      return {} as any;
    };

    // Create a promise and verify setImmediate is used
    Q.resolve(42).then((value) => {
      expect(value).toBe(42);
      expect(setImmediateCalled).toBe(true);
      // Restore globals
      global.process = originalProcess;
      global.window = originalWindow;
      done();
    });
  });
});