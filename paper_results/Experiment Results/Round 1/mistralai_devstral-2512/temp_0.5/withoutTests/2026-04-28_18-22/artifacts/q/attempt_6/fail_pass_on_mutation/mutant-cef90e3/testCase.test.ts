const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise then method", () => {
    it("should properly handle the done flag in rejection path with nested then calls", (done) => {
        const promise = Q.reject(new Error("Test error"));
        let rejectionCount = 0;

        promise.then(
            () => {
                done(new Error("Promise should have been rejected"));
            },
            (error: Error) => {
                rejectionCount++;
                if (rejectionCount > 1) {
                    done(new Error("Rejection handler called multiple times"));
                    return;
                }

                // Create a new promise chain that will trigger the done flag check
                promise.then(
                    () => {
                        done(new Error("Promise should have been rejected"));
                    },
                    (error: Error) => {
                        rejectionCount++;
                        if (rejectionCount === 2) {
                            done();
                        } else {
                            done(new Error("Unexpected rejection count: " + rejectionCount));
                        }
                    }
                );
            }
        );
    });
});