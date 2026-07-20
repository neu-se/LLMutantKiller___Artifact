import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should resolve with the first resolved promise', () => {
        const promise1 = Q.delay(10);
        const promise2 = Q.delay(5);
        return Q.race([promise1, promise2]).then((result) => {
            expect(result).toBeUndefined();
        });
    });
});