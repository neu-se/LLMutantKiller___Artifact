import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject the promise with a timeout error when the timeout is reached', () => {
        const promise = Q.delay(10).timeout(1);
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error) => {
                expect(error.code).toBe('ETIMEDOUT');
            }
        );
    });
});