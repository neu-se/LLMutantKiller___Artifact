import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should not throw an error when the input array has two elements', () => {
        const promise1 = Q.delay(10);
        const promise2 = Q.delay(5);
        expect(() => Q.race([promise1, promise2])).not.toThrowError();
    });
});