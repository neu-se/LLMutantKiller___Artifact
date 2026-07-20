const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return functionality", () => {
  it("should throw QReturnValue with correct value when ReturnValue is undefined", () => {
    // Save original ReturnValue if it exists
    const originalReturnValue = (global as any).ReturnValue;
    delete (global as any).ReturnValue;

    // Force clean state
    delete Q.QReturnValue;

    try {
      const testValue = "test value";

      // This should throw QReturnValue in original code
      let errorThrown: any;
      try {
        Q["return"](testValue);
      } catch (e) {
        errorThrown = e;
      }

      // In original code, errorThrown should have value property
      // In mutated code, errorThrown will be ReferenceError without value property
      expect(errorThrown).toBeDefined();
      expect(errorThrown).toHaveProperty('value');
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