import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise timeout", () => {
    it("should reject with the timeout error when the promise is not fulfilled within the timeout", (done) => {
        const promise = Q(10).timeout(100);
        promise.then(() => {
            done(new Error("Expected promise to reject with timeout error"));
        }, (error) => {
            expect(error.code).toBe("ETIMEDOUT");
            done();
        });
    });
});