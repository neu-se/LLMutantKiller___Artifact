import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.timeout", () => {
    it("should reject the promise if it does not resolve within the given time", () => {
        const promise = Q.delay(100).timeout(50, "Timeout Error");
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error.message).toContain("Timeout Error");
                expect(error.code).toBe("ETIMEDOUT");
            }
        );
    });
});