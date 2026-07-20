import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise timeout", () => {
    it("should reject with a timeout error and then resolve with the original value when the promise is fulfilled after the timeout", (done) => {
        const promise = Q(10).delay(200).timeout(100);
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