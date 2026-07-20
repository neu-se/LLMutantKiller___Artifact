import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array_reduce correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (accumulator, currentValue) => accumulator + currentValue;
        const basis = 0;
        const result = array_reduce(array, callback, basis);
        expect(result).toBe(15);
    });
});