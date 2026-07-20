import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should return a value when valueOf is called on a fulfilled promise", () => {
        const promise = q.Q(5);
        const valueOf = promise.valueOf();
        expect(valueOf).toBe(5);
    });
});