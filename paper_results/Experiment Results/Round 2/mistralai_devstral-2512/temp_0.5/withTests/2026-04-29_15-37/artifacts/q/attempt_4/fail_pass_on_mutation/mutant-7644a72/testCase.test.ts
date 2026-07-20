const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return functionality", () => {
  it("should use QReturnValue when ReturnValue is undefined", () => {
    // Save original ReturnValue if it exists
    const originalReturnValue = (global as any).ReturnValue;
    (global as any).ReturnValue = undefined;

    try {
      const testValue = "test value";

      // This should throw a QReturnValue in original code
      // but throw ReferenceError in mutated code
      let errorThrown: any;
      try {
        Q["return"](testValue);
      } catch (e) {
        errorThrown = e;
      }

      // In original code, errorThrown should be QReturnValue with value property
      // In mutated code, errorThrown will be ReferenceError
      expect(errorThrown).toBeDefined();
      expect(errorThrown.value).toBe(testValue);

      // Clean up
      (global as any).ReturnValue = originalReturnValue;
    } catch (e) {
      // Clean up in case of error
      (global as any).ReturnValue = originalReturnValue;
      throw e;
    }
  });
});