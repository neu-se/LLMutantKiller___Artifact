import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

const Queue_ = require("../../../../../../../../../../../subject_repositories/q/queue.js");
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Queue close behavior", () => {
    it("should resolve the closed promise when get() encounters a closed queue", () => {
        const queue = Queue_();
        
        // Close the queue immediately
        queue.close();
        
        // Attempt to get from the closed queue - this should reject
        const getPromise = queue.get().then(
            function () {
                throw new Error("Expected get() to reject on closed queue");
            },
            function (error: Error) {
                // Expected: get() rejects with the close error
                expect(error.message).toBe("Can't get value from closed queue");
            }
        );
        
        // After get() processes the closed queue, queue.closed should be resolved
        const closedPromise = getPromise.then(function () {
            return queue.closed;
        }).then(function (error: Error) {
            expect(error.message).toBe("Can't get value from closed queue");
        });
        
        return Q.timeout(closedPromise, 500);
    });
});