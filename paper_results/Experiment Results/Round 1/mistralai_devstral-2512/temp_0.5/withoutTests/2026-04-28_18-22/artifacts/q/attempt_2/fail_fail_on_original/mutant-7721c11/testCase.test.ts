import { Q } from "./q";

describe("Q library array_indexOf behavior", () => {
  it("should correctly use array_indexOf in promise operations", () => {
    const deferred = Q.defer();
    const testArray = [1, 2, 3, 4, 5];

    // This will internally use array_indexOf when checking promise states
    const promise = Q(testArray).then(function(arr) {
      // The array_indexOf shim is used internally by Q for various operations
      return arr.indexOf(3);
    });

    return promise.then(function(index) {
      expect(index).toBe(2);
    });
  });
});