import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject the promise with a timeout error when the timeout is reached', () => {
        const promise = Q.delay(50).timeout(10, 'custom error');
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error) => {
                expect(error.message).toBe('Timed out after 10 ms');
                expect(error.code).toBe('ETIMEDOUT');
            }
        );
    });
});