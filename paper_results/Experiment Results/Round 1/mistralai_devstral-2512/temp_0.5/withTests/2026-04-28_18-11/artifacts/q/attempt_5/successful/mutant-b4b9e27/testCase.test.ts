import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Queue error handling", () => {
    it("should properly handle errors when getting from a closed queue", (done) => {
        const queue = Queue();
        const testError = new Error("Test error");

        // Close the queue with a specific error
        queue.close(testError);

        // Verify that get operations are rejected with the same error
        queue.get().then(
            () => done(new Error("Expected get to be rejected")),
            (error: Error) => {
                expect(error).toBe(testError);
                done();
            }
        );
    });
});