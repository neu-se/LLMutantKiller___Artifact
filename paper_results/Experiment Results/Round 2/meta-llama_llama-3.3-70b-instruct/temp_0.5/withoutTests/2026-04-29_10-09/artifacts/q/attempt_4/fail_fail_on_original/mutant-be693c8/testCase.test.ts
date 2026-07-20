import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject the promise after the specified timeout', (done) => {
        const promise = Q.resolve();
        const timeoutPromise = promise.timeout(50);

        timeoutPromise.then(() => {
            done.fail('Expected promise to be rejected');
        }).catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.code).toBe('ETIMEDOUT');
            done();
        });
    });
});