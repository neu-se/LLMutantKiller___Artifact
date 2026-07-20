import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reduce an array correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const promise = Q(array);
        return promise.then((arr) => {
            const sum = arr.reduce((acc, current) => acc + current);
            expect(sum).toBe(15);
        });
    });
});