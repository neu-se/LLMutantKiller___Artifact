import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should iterate over sparse arrays without throwing an error in the original code but throw an error in the mutated code', () => {
        const array = [1, , 3];
        const callback = function(basis: any, value: any, index: any) {
            return basis;
        }
        Q.reduce(array, callback, 0);
        expect(true).toBe(true);
    });
});