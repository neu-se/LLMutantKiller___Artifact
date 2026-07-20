import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should find the index of an element in an array', () => {
        const array = [1, 2, 3, 4, 5];
        const value = 3;
        const index = Q(array_indexOf)(array, value);
        expect(index).not.toBe(-1);
    });
});