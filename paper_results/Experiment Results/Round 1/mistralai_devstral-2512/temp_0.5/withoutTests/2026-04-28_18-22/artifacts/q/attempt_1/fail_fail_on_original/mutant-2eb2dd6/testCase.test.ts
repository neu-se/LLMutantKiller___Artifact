// Test case to detect the mutation in array_reduce
import { Q } from "./q.js";

describe("array_reduce mutation test", () => {
    it("should correctly reduce sparse arrays", () => {
        // Create a sparse array
        const sparseArray = [1, , 3, , 5];
        const initialValue = 0;
        const reducer = (acc: number, curr: number) => acc + curr;

        // Use Q to test the array_reduce behavior
        const result = Q(sparseArray).then((arr: any[]) => {
            return arr.reduce(reducer, initialValue);
        });

        return result.then((sum: number) => {
            // The sum should be 9 (1 + 3 + 5), ignoring the sparse elements
            expect(sum).toBe(9);
        });
    });
});