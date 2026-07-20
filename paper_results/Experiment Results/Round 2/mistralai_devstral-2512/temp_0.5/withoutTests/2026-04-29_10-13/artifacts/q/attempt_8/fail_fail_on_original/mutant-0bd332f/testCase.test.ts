import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when array_reduce encounters empty sparse array", () => {
    // Get the Q object from the module
    const Q = (qModule as any).default || qModule;

    // Create a sparse array that will trigger the array_reduce shim
    const sparseArray = [,,]; // Array with holes
    sparseArray.length = 2;

    // Force use of the shim by temporarily removing native reduce
    const originalReduce = Array.prototype.reduce;
    (Array.prototype as any).reduce = undefined;

    try {
      // Directly test the array_reduce function by using it in a context where
      // it will be called with no initial value on an empty array
      const testArray: any = Object.create(sparseArray);
      testArray.length = 0;

      // This should trigger the shim's initial value determination
      // which will increment index past length in the empty array
      expect(() => {
        Q.all(testArray);
      }).toThrow(TypeError);
    } finally {
      // Restore original reduce
      Array.prototype.reduce = originalReduce;
    }
  });
});