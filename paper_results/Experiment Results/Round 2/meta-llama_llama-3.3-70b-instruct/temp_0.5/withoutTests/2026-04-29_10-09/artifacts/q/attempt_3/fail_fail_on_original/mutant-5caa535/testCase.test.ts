import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array_indexOf correctly', () => {
        const array = [1, 2, 3, undefined];
        const originalIndexOf = Q.array_indexOf;
        expect(originalIndexOf(array, undefined)).toBe(3);
        array.push(undefined);
        expect(originalIndexOf(array, undefined)).toBe(3);
    });
});