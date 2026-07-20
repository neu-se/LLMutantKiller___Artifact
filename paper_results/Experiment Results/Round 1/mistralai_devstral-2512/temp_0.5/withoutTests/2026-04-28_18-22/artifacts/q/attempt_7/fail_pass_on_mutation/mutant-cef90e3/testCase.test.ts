const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise then method", () => {
    it("should properly handle done flag in rejection path with multiple nested calls", (done) => {
        const deferred = Q.defer();
        let rejectionCount = 0;

        deferred.promise.then(
            () => {
                done(new Error("Promise should have been rejected"));
            },
            (error: Error) => {
                rejectionCount++;
                if (rejectionCount > 1) {
                    done(new Error("Rejection handler called multiple times"));
                    return;
                }

                // Trigger another rejection handler call
                deferred.promise.then(
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

        // Reject the promise after setting up handlers
        deferred.reject(new Error("Test error"));
    });
});