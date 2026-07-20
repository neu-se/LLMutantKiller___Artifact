import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array reduce correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (accumulator, currentValue) => accumulator + currentValue;
        const basis = 0;
        const result = array.reduce(callback, basis);
        expect(result).toBe(15);
    });

    it('should throw an error when reduce is called with no initial value on an empty array', () => {
        const array = [];
        const callback = (accumulator, currentValue) => accumulator + currentValue;
        expect(() => array.reduce(callback)).toThrow(TypeError);
    });
});