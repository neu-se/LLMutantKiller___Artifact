import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle sparse arrays correctly', () => {
        const sparseArray = [1, , 3];
        const promise = Q.all(sparseArray.map(x => Q(x)));
        expect(promise.inspect().state).toBe('pending');
    });
});