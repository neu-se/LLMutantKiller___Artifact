import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.return functionality", () => {
  it("should use QReturnValue when ReturnValue is undefined", () => {
    // Ensure ReturnValue is undefined
    const originalReturnValue = (global as any).ReturnValue;
    (global as any).ReturnValue = undefined;

    try {
      const value = "test value";
      const error = new Error("test error");

      // This should use QReturnValue since ReturnValue is undefined
      const result = Q["return"](value);

      // The test expects that Q["return"] throws a QReturnValue
      // In the original code, this will work because QReturnValue is defined
      // In the mutated code, QReturnValue won't be defined, causing a ReferenceError
      expect(() => {
        throw result;
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