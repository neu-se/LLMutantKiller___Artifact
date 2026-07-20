const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_indexOf mutation test", () => {
  it("should correctly find the index of an element in an array", () => {
    // Create a test array
    const testArray = [1, 2, 3, 4, 5];

    // Use Q to create a promise that resolves to the array
    const promise = Q.resolve(testArray);

    // Use the promise's dispatch method to call indexOf
    return promise.dispatch("post", ["indexOf", [3]]).then((result: number) => {
      // The result should be 2 (index of 3 in the array)
      expect(result).toBe(2);
    });
  });
});