const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should only emit unhandledRejection when process.emit is a function", (done) => {
    // First test with process.emit as a function (should emit)
    const originalEmit = process.emit;
    let emitCalledWithFunction = false;

    process.emit = function(event: string, ...args: any[]): boolean {
      if (event === "unhandledRejection") {
        emitCalledWithFunction = true;
      }
      return (originalEmit as Function).call(process, event, ...args);
    };

    const rejectedPromise1 = Q.reject(new Error("Test error 1"));

    setTimeout(() => {
      expect(emitCalledWithFunction).toBe(true);

      // Now test with process.emit not being a function (should not emit)
      const mockProcess = { emit: undefined };
      global.process = mockProcess as any;
      let emitCalledWithoutFunction = false;

      const rejectedPromise2 = Q.reject(new Error("Test error 2"));

      setTimeout(() => {
        // In original code, this should remain false
        // In mutated code (if true), this would become true
        expect(emitCalledWithoutFunction).toBe(false);

        // Restore
        global.process.emit = originalEmit;
        done();
      }, 50);
    }, 50);
  });
});