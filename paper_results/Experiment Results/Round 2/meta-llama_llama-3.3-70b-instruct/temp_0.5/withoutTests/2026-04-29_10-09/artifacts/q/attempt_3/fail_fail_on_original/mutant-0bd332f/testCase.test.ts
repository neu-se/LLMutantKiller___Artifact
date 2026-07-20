import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when array is sparse and reduce is called', () => {
        const sparseArray = [1, , 3];
        expect(() => Q(sparseArray).then(array => array.reduce((a, b) => a + b))).toThrowError();
    });
});