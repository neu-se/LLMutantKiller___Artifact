const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise then method", () => {
    it("should not call rejection handler multiple times when done flag is set", (done) => {
        let rejectionCount = 0;
        const promise = Q.reject(new Error("Test error"));

        promise.then(
            () => {
                done(new Error("Promise should have been rejected"));
            },
            (error: Error) => {
                rejectionCount++;
                if (rejectionCount > 1) {
                    done(new Error("Rejection handler called more than once"));
                    return;
                }

                // Force another call to the rejection handler
                promise.then(
                    () => {
                        done(new Error("Promise should have been rejected"));
                    },
                    (error: Error) => {
                        rejectionCount++;
                        if (rejectionCount === 1) {
                            done();
                        } else {
                            done(new Error("Rejection handler called multiple times"));
                        }
                    }
                );
            }
        );
    });
});