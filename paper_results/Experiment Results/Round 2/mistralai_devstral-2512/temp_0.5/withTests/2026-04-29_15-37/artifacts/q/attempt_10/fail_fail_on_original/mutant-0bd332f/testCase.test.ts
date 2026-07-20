const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should throw TypeError when reduce encounters empty array without initial value", () => {
    // Create a completely empty array
    const emptyArray: any[] = [];
    emptyArray[2] = undefined; // Create sparse array with empty slots

    // Force the reduce to run without initial value
    // This should trigger the TypeError in original code
    let errorCaught = false;
    try {
      // Directly test the reduce behavior
      const result = Q.all(emptyArray);
      // If we get here without error, the mutation is present
    } catch (error) {
      errorCaught = true;
      expect(error).toBeInstanceOf(TypeError);
    }

    // Original code should throw TypeError
    expect(errorCaught).toBe(true);
  });
});