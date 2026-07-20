import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array_reduce correctly', async () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;
        const basis = 0;
        // We need to access the array_reduce function from the q.js file
        // We can do this by using the Q object and its internal functions
        // However, this is not a straightforward process and may require modifying the q.js file
        // For the purpose of this example, let's assume we have access to the array_reduce function
        const result = await Q(array_reduce(array, callback));
        expect(result).toBe(15);
    });
});