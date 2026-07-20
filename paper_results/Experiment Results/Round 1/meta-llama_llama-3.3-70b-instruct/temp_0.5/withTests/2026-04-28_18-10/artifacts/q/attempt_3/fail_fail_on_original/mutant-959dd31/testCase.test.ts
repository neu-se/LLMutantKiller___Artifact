import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
    it("should reject with a timeout error if the promise is too slow and error is not null or undefined", () => {
        const promise = Q.delay(100).timeout(50, "custom error");
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error.message).toBe("Timed out after 50 ms");
                expect(error.code).toBe("ETIMEDOUT");
            }
        );
    });
});