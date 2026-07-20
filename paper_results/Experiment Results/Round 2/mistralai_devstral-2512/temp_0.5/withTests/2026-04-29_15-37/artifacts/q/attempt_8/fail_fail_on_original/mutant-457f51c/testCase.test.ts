import Q from "../../../../../../../../../../../subject_repositories/q/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should correctly handle valueOf for rejected promises", () => {
        const error = new Error("test error");
        const rejectedPromise = Q.reject(error);

        // In original code, valueOf should return the promise itself for rejected promises
        // In mutated code, it will incorrectly return the promise for all cases
        const result = rejectedPromise.valueOf();

        // This assertion will pass in original code but fail in mutated code
        // because the mutated code will always return the promise (due to `if (true)`)
        // while the original code only returns the promise when state is "rejected"
        expect(result).toBe(rejectedPromise);
        expect(result.exception).toBe(error);

        // Additional check to ensure the behavior is correct
        const fulfilledPromise = Q(42);
        const fulfilledResult = fulfilledPromise.valueOf();
        expect(fulfilledResult).toBe(42);
    });
});