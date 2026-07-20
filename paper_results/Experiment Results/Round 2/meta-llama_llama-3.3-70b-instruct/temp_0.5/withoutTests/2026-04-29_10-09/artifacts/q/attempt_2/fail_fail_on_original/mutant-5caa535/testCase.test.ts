import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array_indexOf correctly', () => {
        const array = [1, 2, 3];
        const originalIndexOf = Array.prototype.indexOf;
        Array.prototype.indexOf = Q.array_indexOf;
        expect(array.indexOf(2)).toBe(1);
        expect(array.indexOf(4)).toBe(-1);
        Array.prototype.indexOf = originalIndexOf;
    });
});