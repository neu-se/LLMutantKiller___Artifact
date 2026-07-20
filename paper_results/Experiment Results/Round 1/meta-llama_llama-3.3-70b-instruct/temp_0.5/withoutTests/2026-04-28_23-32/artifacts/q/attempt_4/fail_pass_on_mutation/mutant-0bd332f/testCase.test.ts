import { array_reduce } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('array_reduce', () => {
    it('should throw TypeError when array is sparse and no initial value is provided', () => {
        const array = [];
        array[10] = 1;
        expect(() => array_reduce(array, (basis, value) => basis + value)).toThrow(TypeError);
    });
});