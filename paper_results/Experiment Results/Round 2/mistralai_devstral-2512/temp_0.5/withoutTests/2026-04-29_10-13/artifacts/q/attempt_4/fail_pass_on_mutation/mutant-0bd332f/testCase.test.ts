import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when reduce encounters empty sparse array", () => {
    // Create a sparse array that will trigger the array_reduce shim
    const sparseArray = [,,]; // Array with holes
    sparseArray.length = 2;

    // Force use of the shim by temporarily removing native reduce
    const originalReduce = Array.prototype.reduce;
    delete Array.prototype.reduce;

    try {
      // This should trigger the shim's initial value determination
      // which will increment index past length in the sparse array
      expect(() => {
        Q.all(sparseArray);
      }).toThrow(TypeError);
    } finally {
      // Restore original reduce
      Array.prototype.reduce = originalReduce;
    }
  });
});