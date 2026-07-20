import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should reject the promise with a timeout error if the timeout is exceeded", () => {
        const promise = Q.delay(100).timeout(50, "Timeout Error");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toContain("Timeout Error");
            expect(error.code).toBe("ETIMEDOUT");
        });
    });
});