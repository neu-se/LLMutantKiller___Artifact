import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle setImmediate", () => {
        // Create a promise that resolves after a short delay using setImmediate
        const promise = Q.delay(10);

        // Wait for the promise to resolve
        return promise.then(() => {
            // Check if the promise is fulfilled
            expect(promise.isFulfilled()).toBe(true);
        });
    });
});