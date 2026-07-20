import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise timeout", () => {
    it("should resolve with the original value after timeout when the promise is fulfilled and then is rejected", (done) => {
        const promise = Q(10).timeout(100);
        promise.then((value) => {
            expect(value).toBe(10);
            Q.reject("Test rejection").then(() => {
                done(new Error("Expected promise to reject"));
            }, () => {
                done();
            });
        }, (error) => {
            done(new Error("Expected promise to resolve with original value"));
        });
    });
});