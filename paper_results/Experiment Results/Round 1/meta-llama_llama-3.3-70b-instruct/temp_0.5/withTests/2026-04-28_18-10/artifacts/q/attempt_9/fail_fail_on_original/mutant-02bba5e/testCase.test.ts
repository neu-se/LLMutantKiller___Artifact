import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle the case when error is null", () => {
        var error = null;
        var promise = Q(null);
        expect(promise.isFulfilled()).toBe(true);
    });
});