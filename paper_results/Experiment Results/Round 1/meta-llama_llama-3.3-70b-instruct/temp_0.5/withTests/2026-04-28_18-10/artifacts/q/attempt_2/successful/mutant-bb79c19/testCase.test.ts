import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nearer function", () => {
    it("should return the fulfillment value of a fulfilled promise", () => {
        const promise = Q(10);
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).toBe(10);
    });
});