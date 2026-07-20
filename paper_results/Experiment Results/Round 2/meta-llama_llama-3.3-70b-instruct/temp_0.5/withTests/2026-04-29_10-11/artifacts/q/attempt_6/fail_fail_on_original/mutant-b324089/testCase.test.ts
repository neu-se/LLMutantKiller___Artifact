import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("nearer function", () => {
    it("should return the inspected value of a fulfilled promise", () => {
        const promise = Q(5);
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).toBe(5);
    });

    it("should return undefined for a rejected promise", () => {
        const promise = Q.reject("error");
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).toBeUndefined();
    });
});