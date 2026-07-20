import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when array is sparse and no initial value is provided', () => {
        const array = [];
        array[10] = 1;
        expect(() => {
            const result = array.reduce((basis, value) => basis + value);
        }).toThrow(TypeError);
    });
});