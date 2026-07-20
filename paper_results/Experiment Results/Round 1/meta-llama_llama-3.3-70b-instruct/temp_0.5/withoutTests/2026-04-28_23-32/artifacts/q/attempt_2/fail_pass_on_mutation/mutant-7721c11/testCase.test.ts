import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const index = arr.indexOf(3);
        expect(index).toBe(2);
    });
});