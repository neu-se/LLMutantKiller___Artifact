import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when reduce is called on an empty array with no initial value", () => {
    // Create an array-like object that will trigger the array_reduce shim
    const arrayLike: any = {
      length: 0,
      0: undefined,
      1: undefined
    };

    // Force use of the shim by deleting any native reduce method
    delete arrayLike.reduce;

    // This should trigger the array_reduce shim's initial value determination
    // which will try to find the first defined element in the sparse array
    expect(() => {
      Q.all(arrayLike);
    }).toThrow(TypeError);
  });
});