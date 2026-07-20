import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when array_reduce is called with no initial value and array is sparse', () => {
        const array = [1, , 3];
        const callback = function(basis: any, value: any, index: any) {
            return basis;
        }
        expect(() => Q.reduce(array, callback)).toThrowError(TypeError);
    });
});