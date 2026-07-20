// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce operations", async () => {
    // Create a sparse array where some indices are missing
    const sparseArray = [1, , 3]; // index 1 is missing
    sparseArray[4] = 5; // Add element at index 4, leaving index 3 missing

    // Use Q to wrap the array and perform a reduce operation
    const result = await Q(sparseArray).then((arr: any[]) => {
      return arr.reduce((sum: number, val: any, index: number) => {
        // The original code checks 'if (index in this)' which should skip missing indices
        // The mutated code uses 'if (true)' which would incorrectly include undefined values
        return sum + (val || 0);
      }, 0);
    });

    // With original code: should sum only defined values (1 + 3 + 5 = 9)
    // With mutated code: would sum all indices including undefined (1 + 0 + 3 + 0 + 5 = 9)
    // Wait, this won't detect the difference because both give 9...
    // Let's try a different approach that would show the difference

    // Alternative test: count how many elements are actually processed
    const countPromise = Q(sparseArray).then((arr: any[]) => {
      let count = 0;
      arr.reduce((sum: number, val: any, index: number) => {
        count++;
        return sum;
      }, 0);
      return count;
    });

    const count = await countPromise;

    // Original code should process 3 elements (indices 0, 2, 4)
    // Mutated code would process 5 elements (all indices 0-4)
    expect(count).toBe(3);
  });
});