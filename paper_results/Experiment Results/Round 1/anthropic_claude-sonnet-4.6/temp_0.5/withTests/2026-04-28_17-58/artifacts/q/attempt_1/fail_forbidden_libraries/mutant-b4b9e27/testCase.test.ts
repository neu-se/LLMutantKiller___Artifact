import { describe, it, expect } from "@jest/globals";
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue closed promise resolves when get is called on closed queue", () => {
    it("should resolve the closed promise with the error when get is called after close", () => {
        const queue = Queue();
        queue.close();

        // In the original code, get() on a closed queue calls closed.resolve(error)
        // In the mutated code, the fail handler does nothing, so closed never resolves
        const getPromise = queue.get().then(
            () => { throw new Error("Should not fulfill"); },
            () => { /* expected rejection, ignore */ }
        );

        return getPromise.then(() => {
            return queue.closed.then((error: any) => {
                expect(error).toBeDefined();
                expect(error.message).toBe("Can't get value from closed queue");
            });
        }).timeout(500);
    });
});