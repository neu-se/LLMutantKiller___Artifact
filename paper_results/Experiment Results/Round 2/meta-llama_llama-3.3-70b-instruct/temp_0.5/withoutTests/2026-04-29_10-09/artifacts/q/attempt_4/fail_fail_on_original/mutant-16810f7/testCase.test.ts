import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle unhandled rejections correctly", () => {
    const promise = Q.reject("Test rejection");
    Q.nextTick(() => {
      Q.untrackRejection(promise);
    });
    if (typeof process === "object" && typeof process.emit === "function") {
      const originalEmit = process.emit;
      let emitCalled = false;
      process.emit = function(event, ...args) {
        if (event === "rejectionHandled") {
          emitCalled = true;
        }
        originalEmit.apply(this, arguments);
      };
      Q.untrackRejection(promise);
      expect(emitCalled).toBe(true);
      process.emit = originalEmit;
    }
  });
});