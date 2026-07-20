import { array_indexOf } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const index = array_indexOf(arr, 3);
        expect(index).toBe(2);
    });
});