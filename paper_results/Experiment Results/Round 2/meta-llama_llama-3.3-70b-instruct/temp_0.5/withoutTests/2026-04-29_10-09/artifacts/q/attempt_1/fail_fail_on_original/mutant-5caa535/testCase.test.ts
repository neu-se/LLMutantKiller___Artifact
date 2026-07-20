import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array_indexOf correctly', () => {
        const array = [1, 2, 3];
        expect(Q(array_indexOf(array, 2))).toBe(1);
        expect(Q(array_indexOf(array, 4))).toBe(-1);
    });
});