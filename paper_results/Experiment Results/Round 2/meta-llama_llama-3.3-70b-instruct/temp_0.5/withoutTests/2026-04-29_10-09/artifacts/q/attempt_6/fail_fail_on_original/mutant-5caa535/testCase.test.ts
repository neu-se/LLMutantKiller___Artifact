import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array_indexOf correctly', () => {
        const array = [1, 2, 3];
        const originalIndexOf = Q.array_indexOf;
        expect(originalIndexOf(array, 2)).toBe(1);
        expect(originalIndexOf(array, 4)).toBe(-1);
        const largeArray = new Array(1000);
        largeArray[999] = 1;
        expect(originalIndexOf(largeArray, 1)).toBe(999);
    });
});