import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle timeout with a custom error message", () => {
        const promise = Q(100).timeout(50, "Timed out after 50 ms");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Timed out after 50 ms");
            expect(error.code).toBe("ETIMEDOUT");
        });
    });
});