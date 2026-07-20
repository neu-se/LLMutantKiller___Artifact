import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise timeout", () => {
    it("should reject with the timeout error when the promise is not fulfilled within the timeout and then resolve with the original value", (done) => {
        const promise = Q(10).timeout(100);
        promise.then((value) => {
            expect(value).toBe(10);
            done();
        }, (error) => {
            expect(error.code).toBe("ETIMEDOUT");
            done(new Error("Expected promise to resolve with original value after timeout"));
        });
    });
});