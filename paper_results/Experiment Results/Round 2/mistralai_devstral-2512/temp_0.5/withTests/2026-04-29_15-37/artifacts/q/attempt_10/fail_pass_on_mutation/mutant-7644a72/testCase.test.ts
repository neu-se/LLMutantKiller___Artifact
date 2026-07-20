const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return functionality", () => {
  it("should throw QReturnValue with value property when ReturnValue is undefined", () => {
    // Save original ReturnValue if it exists
    const originalReturnValue = (global as any).ReturnValue;
    delete (global as any).ReturnValue;

    // Force clean state by reloading Q
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    try {
      const testValue = "test value";

      // This should throw QReturnValue in original code
      let errorThrown: any;
      try {
        freshQ["return"](testValue);
      } catch (e) {
        errorThrown = e;
      }

      // In original code, errorThrown should be QReturnValue with value property
      // In mutated code, errorThrown will be ReferenceError
      expect(errorThrown).toBeDefined();
      expect(errorThrown.value).toBe(testValue);
      expect(errorThrown.constructor.name).toBe("QReturnValue");

      // Clean up
      (global as any).ReturnValue = originalReturnValue;
    } catch (e) {
      // Clean up in case of error
      (global as any).ReturnValue = originalReturnValue;
      throw e;
    }
  });
});