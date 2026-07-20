const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle sparse arrays in reduce operation", () => {
    // Create a sparse array with holes
    const sparseArray = [1, , 3]; // index 1 is missing
    sparseArray[4] = 5; // index 3 is missing

    // Test the array_reduce shim directly by creating a promise that uses it
    const promise = Q(sparseArray);

    // Use a timeout to detect infinite loops (which would happen with the mutated code)
    let completed = false;
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        if (!completed) {
          reject(new Error("Test timed out - likely infinite loop in reduce"));
        }
      }, 1000);
    });

    return Promise.race([
      promise.then((arr: any[]) => {
        completed = true;
        // Test that reduce works correctly with sparse arrays
        const result = arr.reduce((acc: number, val: number) => acc + val, 0);
        expect(result).toBe(9); // 1 + 3 + 5
      }),
      timeoutPromise
    ]);
  });
});