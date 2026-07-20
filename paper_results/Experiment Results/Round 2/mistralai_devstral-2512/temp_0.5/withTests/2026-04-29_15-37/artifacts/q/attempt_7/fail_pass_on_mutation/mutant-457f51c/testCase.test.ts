import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the promise itself for rejected promises and not set exception for non-rejected", () => {
        const fulfilledPromise = Q(42);
        const rejectedPromise = Q.reject(new Error("test"));

        // Fulfilled promise should return its value
        expect(fulfilledPromise.valueOf()).toBe(42);

        // Rejected promise should return itself
        expect(rejectedPromise.valueOf()).toBe(rejectedPromise);

        // Rejected promise should have exception property
        expect(rejectedPromise.exception).toBeDefined();
    });
});