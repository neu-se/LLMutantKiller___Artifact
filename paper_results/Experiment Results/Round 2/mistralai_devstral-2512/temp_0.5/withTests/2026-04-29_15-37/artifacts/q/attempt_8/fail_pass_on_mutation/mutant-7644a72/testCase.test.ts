const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return functionality", () => {
  it("should throw when ReturnValue is undefined and QReturnValue is not defined", () => {
    // Save original ReturnValue if it exists
    const originalReturnValue = (global as any).ReturnValue;
    delete (global as any).ReturnValue;

    // Also delete QReturnValue if it exists to test the initialization path
    delete Q.QReturnValue;

    try {
      const testValue = "test value";

      // This should work in original code (throws QReturnValue)
      // but fail in mutated code (throws ReferenceError)
      expect(() => {
        Q["return"](testValue);
      }).toThrow();

      // Clean up
      (global as any).ReturnValue = originalReturnValue;
    } catch (e) {
      // Clean up in case of error
      (global as any).ReturnValue = originalReturnValue;
      throw e;
    }
  });
});