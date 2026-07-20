import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect the mutation in the nextTick function", () => {
        // Create a promise that resolves after a short delay
        const promise = Q.delay(10);

        // Check if the promise is pending after 5ms
        setTimeout(() => {
            expect(promise.isPending()).toBe(true);
        }, 5);

        // Check if the promise is fulfilled after 15ms
        setTimeout(() => {
            expect(promise.isFulfilled()).toBe(true);
        }, 15);
    });
});