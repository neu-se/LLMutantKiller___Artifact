import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject with a timeout error if the promise is too slow', () => {
        return Q.delay(100)
            .timeout(10)
            .then(
                () => {
                    expect(true).toBe(false);
                },
                (error: any) => {
                    expect(error.code).toBe('ETIMEDOUT');
                }
            );
    });
});