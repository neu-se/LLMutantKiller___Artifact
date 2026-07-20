const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise then method", () => {
    it("should properly handle the done flag in rejection path", (done) => {
        const promise = Q.reject(new Error("Test error"));
        let rejectionCalled = false;

        promise.then(
            () => {
                done(new Error("Promise should have been rejected"));
            },
            (error: Error) => {
                if (rejectionCalled) {
                    done(new Error("Rejection handler called multiple times"));
                    return;
                }
                rejectionCalled = true;
                done();
            }
        );
    });
});