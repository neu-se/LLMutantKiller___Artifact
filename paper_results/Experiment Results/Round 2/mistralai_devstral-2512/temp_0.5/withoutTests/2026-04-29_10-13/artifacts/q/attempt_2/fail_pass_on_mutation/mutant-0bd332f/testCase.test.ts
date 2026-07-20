import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when reduce is called on an empty array with no initial value", () => {
    // This test targets the array_reduce shim which is used when Array.prototype.reduce is not available
    // The mutation removes the TypeError throw when index exceeds length during initial value determination
    const emptyArray: any = [];
    // Remove native reduce to force use of the shim
    delete emptyArray.reduce;

    expect(() => {
      Q.all(emptyArray);
    }).toThrow(TypeError);
  });
});