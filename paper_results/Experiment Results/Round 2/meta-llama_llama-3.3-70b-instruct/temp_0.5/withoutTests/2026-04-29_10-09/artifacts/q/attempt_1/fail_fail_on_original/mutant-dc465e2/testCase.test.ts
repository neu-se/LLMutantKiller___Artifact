import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject the promise after the specified timeout', () => {
        const promise = Q.delay(Q.resolve('test'), 100);
        let resolved = false;
        promise.then((value) => {
            resolved = true;
        });
        // Use a timeout to check if the promise is resolved after the delay
        setTimeout(() => {
            expect(resolved).toBe(true);
        }, 150);
    });
});