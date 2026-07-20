import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.all', () => {
    it('should reject when one of the promises is rejected', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject('Error');

        return Q.all([promise1, promise2]).then((values: any[]) => {
            expect(true).toBe(false); // This should not be reached
        }).catch((error: any) => {
            expect(error).toBe('Error');
        });
    });
});