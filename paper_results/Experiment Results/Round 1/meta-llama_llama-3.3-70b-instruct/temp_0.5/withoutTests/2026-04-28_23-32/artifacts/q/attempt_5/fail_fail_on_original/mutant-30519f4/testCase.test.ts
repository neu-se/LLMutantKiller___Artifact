import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.all', () => {
    it('should reject when any of the promises are rejected in the mutated code', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject('Error');

        return Q.all([promise1, promise2]).then((values) => {
            expect(values).toEqual([1, 'Error']); // This should fail in the original code and pass in the mutated code
        });
    });
});