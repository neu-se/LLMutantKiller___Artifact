import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.return functionality", () => {
  it("should throw QReturnValue when ReturnValue is undefined", () => {
    // Save original ReturnValue if it exists
    const originalReturnValue = (global as any).ReturnValue;
    (global as any).ReturnValue = undefined;

    try {
      const testValue = "test value";

      // This should throw a QReturnValue
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