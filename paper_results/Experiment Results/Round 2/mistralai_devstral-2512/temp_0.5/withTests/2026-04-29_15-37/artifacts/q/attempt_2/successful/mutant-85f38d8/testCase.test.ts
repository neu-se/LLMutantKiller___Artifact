import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected function", () => {
    it("should correctly identify rejected promises", () => {
        const error = new Error("Test error");
        const rejectedPromise = Q.reject(error);

        // The original code should return true for a rejected promise
        expect(Q.isRejected(rejectedPromise)).toBe(true);

        // The mutated code would return true for any input, including non-promises
        // This test ensures we're checking the actual behavior
        const fulfilledPromise = Q.resolve(42);
        expect(Q.isRejected(fulfilledPromise)).toBe(false);

        // Also test with non-promise values
        expect(Q.isRejected(42)).toBe(false);
        expect(Q.isRejected({})).toBe(false);
        expect(Q.isRejected(null)).toBe(false);
    });
});