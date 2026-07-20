const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly handle indexOf on empty array", () => {
    // Create an empty test array
    const testArray: number[] = [];

    // Use Q to create a promise that resolves to the array
    const promise = Q.resolve(testArray);

    // Use the promise's dispatch method to call indexOf
    return promise.dispatch("post", ["indexOf", [1]]).then((result: number) => {
      // The result should be -1 (not found in empty array)
      expect(result).toBe(-1);
    });
  });
});