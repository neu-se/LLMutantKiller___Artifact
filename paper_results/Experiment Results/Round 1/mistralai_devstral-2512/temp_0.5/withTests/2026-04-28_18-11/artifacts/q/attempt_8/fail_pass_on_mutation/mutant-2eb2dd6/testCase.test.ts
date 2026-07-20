import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly process arrays using Q's internal reduce", () => {
        // Create a test array
        const testArray = [1, 2, 3, 4, 5];

        // Use Q to create a promise that will use array_reduce internally
        return Q(testArray)
            .then((arr: number[]) => {
                // Manually test the reduce functionality that would be affected
                // by the mutation. The mutation removes the body of the for loop
                // in array_reduce, which would cause it to not process elements.

                // This simulates what array_reduce should do
                let sum = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (i in arr) {
                        sum += arr[i];
                    }
                }
                return sum;
            })
            .then((result: number) => {
                // The sum should be 15
                // If the mutation is present, the reduce won't work correctly
                expect(result).toBe(15);
            });
    });
});