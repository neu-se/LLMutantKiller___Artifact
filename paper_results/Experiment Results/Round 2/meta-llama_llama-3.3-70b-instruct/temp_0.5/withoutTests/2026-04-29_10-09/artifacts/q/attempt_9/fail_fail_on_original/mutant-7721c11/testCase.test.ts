import { array_indexOf } from "../../../../../../../../subject_repositories/q/q.js";

describe('array_indexOf', () => {
    it('should return the correct index when the value is found in the array', () => {
        const array = [1, 2, 3, 4, 5];
        const value = 3;
        expect(array_indexOf(array, value)).toBe(2);
    });
});