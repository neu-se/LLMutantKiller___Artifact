import { array_indexOf } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array_indexOf correctly', () => {
        const array = [1, 2, 3];
        expect(array_indexOf(array, 2)).toBe(1);
        expect(array_indexOf(array, 4)).toBe(-1);
        const largeArray = new Array(1000).fill(1);
        expect(array_indexOf(largeArray, 1)).toBe(0);
    });
});