import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise rejection handling", () => {
    it("should handle multiple rejections correctly", (done) => {
        let rejectionCount = 0;
        const promise = Q.reject(new Error("Test error"));

        promise.then(
            () => {
                done(new Error("Promise should have been rejected"));
            },
            (error: Error) => {
                rejectionCount++;
                if (rejectionCount === 1) {
                    promise.then(
                        () => {
                            done(new Error("Promise should have been rejected"));
                        },
                        (error: Error) => {
                            rejectionCount++;
                            if (rejectionCount === 2) {
                                done();
                            } else {
                                done(new Error("Expected exactly 2 rejection callbacks"));
                            }
                        }
                    );
                }
            }
        );
    });
});