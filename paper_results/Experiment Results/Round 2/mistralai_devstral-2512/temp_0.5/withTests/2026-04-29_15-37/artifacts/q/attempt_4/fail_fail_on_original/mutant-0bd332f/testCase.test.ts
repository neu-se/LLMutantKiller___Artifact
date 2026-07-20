const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should throw TypeError when reduce is called on empty array without initial value", () => {
    // Create a sparse array where the first element is missing
    const sparseArray = [, 1, 2]; // index 0 is empty

    // This should trigger the reduce implementation with no initial value
    expect(() => {
      Q.all(sparseArray);
    }).toThrow(TypeError);
  });
});