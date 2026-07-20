import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library array_reduce shim", () => {
  it("should throw TypeError when array_reduce is called on empty array without initial value", () => {
    // Get the Q object from the module
    const Q = (qModule as any).default || qModule;

    // Create an array-like object that will trigger the array_reduce shim
    const emptyArrayLike: any = {
      length: 0
    };

    // Force use of the shim by temporarily removing native reduce
    const originalReduce = Array.prototype.reduce;
    (Array.prototype as any).reduce = undefined;

    try {
      // Directly test the array_reduce function by using it in a context where
      // it will be called with no initial value on an empty array
      const testArray: any = Object.create(emptyArrayLike);
      testArray.length = 0;

      // This should trigger the shim's initial value determination
      // which will increment index past length in the empty array
      let errorThrown = false;
      try {
        Q.all(testArray);
      } catch (e) {
        if (e instanceof TypeError) {
          errorThrown = true;
        }
      }
      expect(errorThrown).toBe(true);
    } finally {
      // Restore original reduce
      Array.prototype.reduce = originalReduce;
    }
  });
});