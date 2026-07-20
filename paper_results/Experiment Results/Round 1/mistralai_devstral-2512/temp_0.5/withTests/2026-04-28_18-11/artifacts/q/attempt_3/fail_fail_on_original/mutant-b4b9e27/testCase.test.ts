import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Queue error handling", () => {
    it("should close the queue and reject subsequent get operations with the error", (done) => {
        const queue = Queue();
        const testError = new Error("Test error");

        // Close the queue with a specific error
        queue.close(testError);

        // Verify that the queue's closed promise resolves with the error
        queue.closed.then((closedError) => {
            expect(closedError).toBe(testError);

            // Verify that get operations are rejected with the same error
            queue.get().then(
                () => done(new Error("Expected get to be rejected")),
                (error) => {
                    expect(error).toBe(testError);
                    queue.get().then(
                        () => done(new Error("Expected get to be rejected")),
                        (error) => {
                            expect(error).toBe(testError);
                            done();
                        }
                    );
                }
            );
        }).catch((error) => {
            done(error);
        });
    });
});