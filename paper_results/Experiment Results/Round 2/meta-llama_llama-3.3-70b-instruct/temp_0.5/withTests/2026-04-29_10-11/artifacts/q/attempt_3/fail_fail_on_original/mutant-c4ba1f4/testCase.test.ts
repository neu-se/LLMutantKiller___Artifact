import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle setImmediate", () => {
        // Create a promise that resolves after a short delay
        const promise = Q.delay(10);

        // Check if the promise is pending
        expect(promise.isPending()).toBe(true);

        // Wait for the promise to resolve
        return promise.then(() => {
            // Check if the promise is fulfilled
            expect(promise.isFulfilled()).toBe(true);
        });
    });
});