const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly find the index of the last element in an array", () => {
    // Create a test array
    const testArray = [1, 2, 3, 4, 5];
    // Use Q to create a promise that resolves to the array
    const promise = Q(testArray);
    // Use the promise's dispatch method to call indexOf on the last element
    return promise.dispatch("post", ["indexOf", [5]]).then((result: number) => {
      // The index of 5 should be 4
      expect(result).toBe(4);
    });
  });
});