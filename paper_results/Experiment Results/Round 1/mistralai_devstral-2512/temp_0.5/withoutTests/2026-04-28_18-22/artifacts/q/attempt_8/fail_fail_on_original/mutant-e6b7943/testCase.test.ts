const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should correctly handle Q.return() in generators", () => {
    // Test using Q.return() which creates a QReturnValue
    const testGenerator = function*() {
      yield "step1";
      Q["return"]("test value");
      yield "unreachable";
    };

    // Use Q.async to test the behavior
    const promise = Q.async(testGenerator)();

    return promise.then((result: any) => {
      // In the original code, this should return "test value"
      // In the mutated code, the behavior might be different
      expect(result).toBe("test value");
    });
  });
});