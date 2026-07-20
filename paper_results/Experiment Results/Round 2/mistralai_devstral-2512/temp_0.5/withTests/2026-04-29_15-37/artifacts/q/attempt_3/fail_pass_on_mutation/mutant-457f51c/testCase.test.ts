import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the fulfillment value for fulfilled promises", () => {
        const fulfilledPromise = Q(42);
        expect(fulfilledPromise.valueOf()).toBe(42);
    });
});