import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when array is sparse and no initial value is provided', () => {
        const array = [undefined, undefined, undefined];
        array[10] = 1;
        expect(() => Q(array).reduce((acc, curr) => acc + curr)).toThrow(TypeError);
    });
});