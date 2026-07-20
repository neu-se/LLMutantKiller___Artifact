import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise timeout", () => {
    it("should reject with a timeout error when the promise is not fulfilled within the timeout", (done) => {
        const promise = Q.delay(10, 200).timeout(100);
        promise.then((value) => {
            done(new Error("Expected promise to reject with timeout error"));
        }, (error) => {
            expect(error.code).toBe("ETIMEDOUT");
            done();
        });
    });
});