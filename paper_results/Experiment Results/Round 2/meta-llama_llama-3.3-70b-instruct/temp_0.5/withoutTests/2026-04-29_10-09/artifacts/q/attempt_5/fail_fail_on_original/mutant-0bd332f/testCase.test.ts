import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle sparse arrays correctly', () => {
        const sparseArray = [1, , 3];
        const promise = Q.all(sparseArray);
        expect(promise).resolves.toEqual([1, undefined, 3]);
    });
});