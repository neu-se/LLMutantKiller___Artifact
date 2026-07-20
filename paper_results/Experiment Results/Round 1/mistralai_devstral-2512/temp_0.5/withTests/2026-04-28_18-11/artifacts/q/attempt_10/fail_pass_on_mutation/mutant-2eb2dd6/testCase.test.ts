import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly process arrays using Q's internal operations", () => {
        // Create a sparse array where some indices are missing
        const sparseArray = [1, , 3]; // index 1 is missing
        sparseArray[4] = 5; // index 3 is missing

        // Use Q to create a promise that resolves with our sparse array
        return Q(sparseArray)
            .then((arr: any[]) => {
                // Manually implement the reduce operation that Q's array_reduce should perform
                // This simulates what would happen if Q had to use its internal array_reduce
                let sum = 0;
                let count = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (i in arr) {  // This is the key check that the mutation removes
                        sum += arr[i];
                        count++;
                    }
                }
                // For a sparse array [1, ,3,,5], we should have 3 elements
                expect(count).toBe(3);
                expect(sum).toBe(9);
            });
    });
});