import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject with a timeout error if the promise is too slow', () => {
        var promise = Q.timeout(Q.delay(100), 10, "Timeout");
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error.message).toContain("Timeout");
            }
        );
    });
});