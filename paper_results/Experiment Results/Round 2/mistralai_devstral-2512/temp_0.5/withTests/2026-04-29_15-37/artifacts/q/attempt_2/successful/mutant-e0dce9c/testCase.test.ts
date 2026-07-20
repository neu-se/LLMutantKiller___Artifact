import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the fulfilled value for a fulfilled promise", () => {
        const fulfilledPromise = Q(42);
        const value = fulfilledPromise.valueOf();
        expect(value).toBe(42);
    });
});