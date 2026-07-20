const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle sparse arrays in reduce operation without initial value", () => {
    // Create a sparse array where first element is missing
    const sparseArray = [];
    sparseArray[1] = 1;
    sparseArray[2] = 2;

    // Test the array_reduce shim directly
    const promise = Q(sparseArray);

    // Use a timeout to detect infinite loops
    let testCompleted = false;
    const timeout = new Promise((_, reject) => {
      setTimeout(() => {
        if (!testCompleted) {
          reject(new Error("Test timed out - infinite loop detected in reduce"));
        }
      }, 50);
    });

    return Promise.race([
      promise.then((arr: any[]) => {
        // Test reduce without initial value on sparse array
        // This should find the first present element (1 at index 1)
        // and use it as initial value
        const result = arr.reduce((acc: number, val: number) => acc + val);
        testCompleted = true;
        expect(result).toBe(3); // 1 + 2
      }),
      timeout
    ]);
  });
});