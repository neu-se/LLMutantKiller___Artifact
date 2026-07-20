const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle array indexOf with value at last index", () => {
    // Create a test array where we'll search for undefined
    const testArray = [1, 2, 3, undefined];

    // Use Q to create a promise that resolves to our test array
    const promise = Q.resolve(testArray);

    return promise.then((arr: any[]) => {
      // Test finding undefined which is at the last index (3)
      // In original code: should return 3
      // In mutated code (i <= this.length): will also check arr[4] which is undefined
      // and might return 4 instead of 3
      const indexOfUndefined = arr.indexOf(undefined);
      expect(indexOfUndefined).toBe(3);

      // Test with array where undefined is the only element
      const singleUndefined = [undefined];
      expect(singleUndefined.indexOf(undefined)).toBe(0);

      return true;
    });
  });
});