import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when array is sparse and no initial value is provided', () => {
        const array = [];
        array[10] = 1;
        expect(() => Q(array_reduce(array, function (basis, value) { return basis + value; }))).toThrow(TypeError);
    });
});