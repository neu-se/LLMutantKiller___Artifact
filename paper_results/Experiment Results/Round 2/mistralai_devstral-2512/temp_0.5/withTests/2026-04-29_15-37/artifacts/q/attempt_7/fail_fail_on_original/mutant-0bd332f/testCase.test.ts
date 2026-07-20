const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should handle empty array reduce correctly", () => {
    // Directly test the array_reduce shim behavior
    // The mutation removes the TypeError throw when index >= length
    const testArray = Array(3); // Create sparse array [empty × 3]

    // This will trigger the reduce implementation with no initial value
    // and empty slots, which should throw TypeError in original code
    let errorThrown = false;
    try {
      Q.all(testArray).then(() => {
        // Should not reach here in original code
      });
    } catch (error) {
      errorThrown = true;
      expect(error).toBeInstanceOf(TypeError);
    }

    // In original code, error should be thrown
    expect(errorThrown).toBe(true);
  });
});