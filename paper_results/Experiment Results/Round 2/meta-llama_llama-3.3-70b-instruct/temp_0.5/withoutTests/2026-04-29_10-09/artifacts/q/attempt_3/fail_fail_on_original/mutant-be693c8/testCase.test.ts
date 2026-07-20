import { Q } from "./q";

describe('Q', () => {
    it('should reject the promise after the specified timeout', (done) => {
        const promise = Q.resolve();
        const timeoutPromise = promise.timeout(50, new Error('Timeout'));

        timeoutPromise.then(() => {
            done.fail('Expected promise to be rejected');
        }).catch((error) => {
            expect(error.message).toBe('Timeout');
            done();
        });
    });
});