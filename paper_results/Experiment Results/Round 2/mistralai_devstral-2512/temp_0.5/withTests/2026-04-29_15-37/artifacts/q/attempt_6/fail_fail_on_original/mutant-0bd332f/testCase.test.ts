const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should throw TypeError when reduce encounters empty slot without initial value", () => {
    // Create a scenario that directly tests the reduce implementation
    // by using a sparse array where the first element is present but subsequent ones are empty
    const testArray = [1, , ,]; // First element exists, rest are empty

    // This should trigger the reduce path that checks for empty slots
    // The mutation removes the TypeError throw, so this will fail differently
    return Q.all(testArray).then(() => {
      // If we get here, the mutation is present (no error thrown)
      throw new Error("Expected TypeError was not thrown");
    }).catch((error: any) => {
      // Original code should throw TypeError
      expect(error).toBeInstanceOf(TypeError);
    });
  });
});