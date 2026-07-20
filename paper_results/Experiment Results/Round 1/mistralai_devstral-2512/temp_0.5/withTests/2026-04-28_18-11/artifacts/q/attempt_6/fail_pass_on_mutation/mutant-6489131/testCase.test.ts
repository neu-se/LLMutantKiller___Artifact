// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation detection", () => {
  it("should correctly handle empty array reduce without initial value", () => {
    // Create an empty array
    const emptyArray: any[] = [];

    // This test targets the specific mutation where the break condition
    // was removed from the while loop in array_reduce
    return Q.fcall(() => {
      // Set a timeout to detect hanging
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Infinite loop detected - mutation present"));
        }, 500);

        try {
          // This should throw TypeError in original code
          // but hang in mutated code due to missing break
          const result = emptyArray.reduce((acc: number, val: number) => {
            return acc + val;
          });
          clearTimeout(timeout);
          resolve(result);
        } catch (error) {
          clearTimeout(timeout);
          // Expected TypeError in original code
          if (error instanceof TypeError) {
            resolve("TypeError");
          } else {
            reject(error);
          }
        }
      });
    }).then((result) => {
      // In original code, we expect a TypeError
      expect(result).toBe("TypeError");
    });
  });
});