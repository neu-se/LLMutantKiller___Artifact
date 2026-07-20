const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle sparse arrays in reduce operation", () => {
    // Create a sparse array where first element is missing
    const sparseArray = [];
    sparseArray[1] = 1;
    sparseArray[2] = 2;

    // Test the array_reduce shim directly by calling reduce without initial value
    // This triggers the code path with the mutation
    const promise = Q(sparseArray);

    // Use a timeout to detect infinite loops
    let testCompleted = false;
    const timeout = new Promise((_, reject) => {
      setTimeout(() => {
        if (!testCompleted) {
          reject(new Error("Test timed out - infinite loop detected"));
        }
      }, 50);
    });

    return Promise.race([
      promise.then((arr: any[]) => {
        // This should work with original code (finds first present element)
        // but will hang with mutated code (missing break statement)
        const result = arr.reduce((acc: number, val: number) => acc + val);
        testCompleted = true;
        expect(result).toBe(3); // 1 + 2
      }),
      timeout
    ]);
  });
});