const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return functionality", () => {
  it("should throw QReturnValue with correct value property", () => {
    // Save original ReturnValue if it exists
    const originalReturnValue = (global as any).ReturnValue;
    (global as any).ReturnValue = undefined;

    try {
      const testValue = "test value";

      // This should throw a QReturnValue in original code
      let errorThrown: any;
      try {
        Q["return"](testValue);
      } catch (e) {
        errorThrown = e;
      }

      // In original code, errorThrown should be QReturnValue with value property
      // In mutated code, this will fail because QReturnValue won't be defined
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