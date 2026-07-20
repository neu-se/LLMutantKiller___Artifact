describe("Q", () => {
  it("should handle unhandled rejections correctly", () => {
    const Q = require('./q');
    const promise = Q.reject("Test rejection");
    Q.nextTick(() => {
      Q.untrackRejection(promise);
    });
    if (typeof process === "object" && typeof process.emit === "function") {
      const originalEmit = process.emit;
      let emitCalled = false;
      (process as any).emit = (event: string, ...args: any[]) => {
        if (event === "rejectionHandled") {
          emitCalled = true;
        }
        (originalEmit as any).apply(process, [event, ...args]);
      };
      Q.untrackRejection(promise);
      expect(emitCalled).toBe(true);
      (process as any).emit = originalEmit;
    } else {
      expect(false).toBe(true); // This should fail if process is not an object or process.emit is not a function
    }
  });
});