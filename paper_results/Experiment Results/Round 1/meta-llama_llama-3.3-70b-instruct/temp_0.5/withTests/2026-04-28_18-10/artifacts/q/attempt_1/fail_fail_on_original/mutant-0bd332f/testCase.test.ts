import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when array_reduce is called with no initial value and array is sparse', () => {
        const array = [1, , 3];
        expect(() => Q(array_reduce(array, (basis: any, value: any, index: any) => { }, void 0))).toThrowError(TypeError);
    });
});