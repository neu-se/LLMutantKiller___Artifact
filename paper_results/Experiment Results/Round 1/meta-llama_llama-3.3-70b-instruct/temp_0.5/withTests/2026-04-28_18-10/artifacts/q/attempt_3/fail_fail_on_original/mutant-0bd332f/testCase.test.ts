import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should iterate over sparse arrays', () => {
        const array = [1, , 3];
        let index = 0;
        const callback = function(basis: any, value: any, idx: any) {
            if (idx in array) {
                index++;
            }
        }
        Q.reduce(array, callback);
        expect(index).toBe(2);
    });
});