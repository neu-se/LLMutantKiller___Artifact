import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should resolve with the first resolved promise', () => {
        const promise1 = Q.delay(10, 'first');
        const promise2 = Q.delay(5, 'second');
        return Q.race([promise1, promise2]).then((result) => {
            expect(result).toBe('second');
        });
    });
});