import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject the promise after the specified timeout', () => {
        const promise = Q.resolve();
        const timeoutPromise = promise.timeout(50);

        return expect(timeoutPromise).rejects.toHaveProperty('code', 'ETIMEDOUT');
    });
});