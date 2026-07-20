const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Create a QReturnValue instance
    const qReturnValue = new Q.QReturnValue("test");

    // Test isStopIteration with StopIteration
    const result1 = Q.isStopIteration(stopIteration);
    expect(result1).toBe(true);

    // Test isStopIteration with QReturnValue
    const result2 = Q.isStopIteration(qReturnValue);
    expect(result2).toBe(true);

    // Test isStopIteration with regular error
    const regularError = new Error("test");
    const result3 = Q.isStopIteration(regularError);
    expect(result3).toBe(false);
  });
});