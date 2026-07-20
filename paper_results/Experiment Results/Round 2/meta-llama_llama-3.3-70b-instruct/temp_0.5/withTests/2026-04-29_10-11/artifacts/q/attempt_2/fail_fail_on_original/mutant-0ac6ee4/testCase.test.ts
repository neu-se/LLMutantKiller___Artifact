import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle timeout with a custom error message", () => {
        const promise = Q.delay(100).timeout(50, "Custom error message");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toContain("Custom error message");
            expect(error.code).toBe("ETIMEDOUT");
        });
    });
});