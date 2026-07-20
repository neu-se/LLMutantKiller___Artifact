const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should correctly handle generator return values", () => {
    // Test with a QReturnValue instance
    const returnValue = new Q.QReturnValue("test value");

    // In the original code, isStopIteration should return true for QReturnValue
    // In the mutated code, it will always return true
    const result = Q.isStopIteration(returnValue);

    // This should pass in original code (true for QReturnValue)
    // This will also pass in mutated code (always true)
    expect(result).toBe(true);

    // Now test with a regular object that's not StopIteration or QReturnValue
    const regularObject = { some: "object" };

    // In original code, this should be false
    // In mutated code, this will be true (exposing the mutation)
    const result2 = Q.isStopIteration(regularObject);
    expect(result2).toBe(false);
  });
});