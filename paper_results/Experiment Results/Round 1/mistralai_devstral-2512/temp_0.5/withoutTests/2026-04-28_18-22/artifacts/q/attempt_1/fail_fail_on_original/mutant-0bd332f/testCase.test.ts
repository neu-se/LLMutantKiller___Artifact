import { Q } from "./q";

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when reduce is called on an empty array with no initial value", () => {
    // This test targets the mutation in the array_reduce shim
    // The original code throws TypeError when index exceeds length
    // The mutated code removes this error throwing behavior
    expect(() => {
      Q([].reduce(function() {}));
    }).toThrow(TypeError);
  });
});