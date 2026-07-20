import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should work correctly with array_indexOf', () => {
        const array = [1, 2, 3, 4, 5];
        const result = Q(array_indexOf)(array, 3);
        expect(result).toBe(2);
    });
});