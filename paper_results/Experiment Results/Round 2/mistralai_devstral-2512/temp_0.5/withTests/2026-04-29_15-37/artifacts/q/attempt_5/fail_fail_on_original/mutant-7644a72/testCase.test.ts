const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.return functionality", () => {
  it("should properly define QReturnValue when ReturnValue is undefined", () => {
    // Save original ReturnValue if it exists
    const originalReturnValue = (global as any).ReturnValue;
    (global as any).ReturnValue = undefined;

    try {
      // Force the code path that defines QReturnValue
      const testValue = "test value";

      // This should work in original code but fail in mutated code
      expect(() => {
        Q["return"](testValue);
      }).toThrow();

      // In original code, QReturnValue should be defined
      // In mutated code, QReturnValue won't be defined
      expect(Q.QReturnValue).toBeDefined();
      expect(new Q.QReturnValue(testValue).value).toBe(testValue);

      // Clean up
      (global as any).ReturnValue = originalReturnValue;
    } catch (e) {
      // Clean up in case of error
      (global as any).ReturnValue = originalReturnValue;
      throw e;
    }
  });
});