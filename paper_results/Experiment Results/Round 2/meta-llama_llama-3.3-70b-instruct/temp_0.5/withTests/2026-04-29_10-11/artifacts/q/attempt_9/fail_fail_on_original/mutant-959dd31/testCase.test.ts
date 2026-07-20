import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject the promise with a timeout error when the timeout is reached', () => {
        const promise = Q.timeout(Q(10), 1);
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error).toBeInstanceOf(Error);
                expect(error.code).toBe('ETIMEDOUT');
            }
        );
    });
});