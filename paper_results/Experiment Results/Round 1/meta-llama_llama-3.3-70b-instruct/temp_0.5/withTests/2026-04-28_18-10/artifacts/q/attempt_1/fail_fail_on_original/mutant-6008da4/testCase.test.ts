import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should detect the mutation in nextTick function", () => {
        // Create a promise that resolves after a short delay
        const promise = Q.delay(10);

        // Check if the promise is pending
        expect(Q.isPending(promise)).toBe(true);

        // Wait for the promise to resolve
        return promise.then(() => {
            // Check if the promise is fulfilled
            expect(Q.isFulfilled(promise)).toBe(true);
        });
    });
});