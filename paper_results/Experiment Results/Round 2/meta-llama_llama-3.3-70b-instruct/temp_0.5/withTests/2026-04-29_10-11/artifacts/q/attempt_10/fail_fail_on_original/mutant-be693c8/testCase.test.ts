import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject with a timeout error if the promise is too slow and error is not null', () => {
        var promise = Q.timeout(Q.delay(100), 10, new Error("Timeout"));
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error).not.toBeNull();
                expect(error.message).toBe("Timeout");
            }
        );
    });
});