import { Q } from "../../../../../q";

describe('Q', () => {
    it('should reject the promise with a timeout error when the timeout is reached', () => {
        const promise = Q(10).timeout(10, 'custom error');
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toContain('custom error');
                expect(error.code).toBe('ETIMEDOUT');
            }
        );
    });
});