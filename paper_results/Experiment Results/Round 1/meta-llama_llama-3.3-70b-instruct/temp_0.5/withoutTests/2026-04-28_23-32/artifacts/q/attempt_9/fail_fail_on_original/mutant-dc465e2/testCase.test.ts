import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise timeout", () => {
    it("should reject with a timeout error when the promise is not fulfilled within the timeout and then resolve with the original value", (done) => {
        const promise = Q.delay(10, 200).timeout(100);
        let rejected = false;
        promise.then((value) => {
            if (rejected) {
                expect(value).toBe(10);
                done();
            } else {
                done(new Error("Expected promise to reject with timeout error before resolving"));
            }
        }, (error) => {
            rejected = true;
            expect(error.code).toBe("ETIMEDOUT");
        });
    });
});