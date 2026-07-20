import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
  it("should not throw when process.emit is not a function", () => {
    const originalEmit = process.emit;
    
    try {
      // Replace process.emit with a non-function value
      // Original code: typeof process === "object" && typeof process.emit === "function"
      // -> false, so process.emit is never called (no throw)
      // Mutated code: typeof process === "object" || typeof process.emit === "function"
      // -> true (first condition), so process.emit(...) is called -> TypeError
      (process as any).emit = "not-a-function";
      
      Q.resetUnhandledRejections();
      
      // This should not throw in original code (guard prevents process.emit call)
      // In mutated code, it would try to call process.emit which is not a function
      expect(() => {
        Q.reject(new Error("test rejection"));
      }).not.toThrow();
    } finally {
      process.emit = originalEmit;
    }
  });
});