import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a promise that resolves with the given value", () => {
        var promise = q.Q(5);
        expect(promise.isFulfilled()).toBe(true);
        expect(promise.inspect().value).toBe(5);
    });
});