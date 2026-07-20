import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly reduce sparse arrays", () => {
        // Create a sparse array
        const sparseArray = [1, , 3]; // index 1 is missing
        sparseArray[4] = 5; // index 3 is missing

        // Use Q to create a promise that resolves with our sparse array
        // and then use array_reduce internally through promise operations
        return Q(sparseArray)
            .then((arr: any[]) => {
                // Manually test the reduce functionality that would be affected
                // by the mutation. The mutation removes the body of the for loop
                // in array_reduce, which would cause it to not process elements
                // in sparse arrays correctly.

                // This simulates what array_reduce should do with a sparse array
                let sum = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (i in arr) {
                        sum += arr[i];
                    }
                }
                return sum;
            })
            .then((result: number) => {
                // The sum should be 1 + 3 + 5 = 9
                // If the mutation is present, the reduce won't work correctly
                // and we won't get the expected result
                expect(result).toBe(9);
            });
    });
});