import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = Q(arr);
        return promise.then((array: any[]) => {
            const result = array.filter((element) => element === 3);
            expect(result.length).toBe(1);
        });
    });
});