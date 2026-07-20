import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when array is sparse and no initial value is provided', () => {
        const array = [];
        array[10] = 1;
        const reduceFunction = function (basis, value) { return basis + value; };
        expect(() => array_reduce(array, reduceFunction)).toThrow(TypeError);
    });
});