import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the fulfillment value for fulfilled promises", () => {
        const promise = Q(42);
        expect(promise.valueOf()).toBe(42);
    });
});