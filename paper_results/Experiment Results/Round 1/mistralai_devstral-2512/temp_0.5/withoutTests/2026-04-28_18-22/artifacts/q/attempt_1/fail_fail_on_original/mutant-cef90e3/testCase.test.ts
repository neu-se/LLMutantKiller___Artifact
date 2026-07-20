import { Q } from "./q.js";

describe("Promise rejection handling", () => {
    it("should handle multiple rejections correctly", (done) => {
        let rejectionCount = 0;
        const promise = Q.reject(new Error("Test error"));

        promise.then(
            () => {
                // This should not be called
                done(new Error("Promise should have been rejected"));
            },
            (error) => {
                rejectionCount++;
                if (rejectionCount === 1) {
                    // Try to reject again
                    promise.then(
                        () => {
                            done(new Error("Promise should have been rejected"));
                        },
                        (error) => {
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