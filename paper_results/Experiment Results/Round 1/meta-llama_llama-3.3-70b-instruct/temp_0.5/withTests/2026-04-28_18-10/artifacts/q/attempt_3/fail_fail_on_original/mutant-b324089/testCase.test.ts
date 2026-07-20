import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", () => {
    it("should return the fulfillment value of a fulfilled promise", () => {
        const promise = q.Q(10);
        const result = q.Q.nearer(promise);
        expect(result).toBe(10);
    });
});