import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should detect the mutation in nextTick function", () => {
        // Create a promise that resolves after a short delay
        const promise = Q(10);

        // Check if the promise is fulfilled
        expect(Q.isFulfilled(promise)).toBe(true);

        // Use nextTick to check if the mutation affects the behavior
        let called = false;
        Q.nextTick(() => {
            called = true;
        });

        // If the mutation is present, nextTick should be called immediately
        if (typeof process === "object" && process && process.nextTick) {
            expect(called).toBe(true);
        } else {
            // If the mutation is not present, nextTick should not be called immediately
            expect(called).toBe(false);
        }
    });
});