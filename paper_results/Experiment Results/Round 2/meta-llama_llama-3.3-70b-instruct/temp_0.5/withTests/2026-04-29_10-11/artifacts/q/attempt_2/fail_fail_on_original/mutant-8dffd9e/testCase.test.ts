import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", function () {
    it("should return false for a promise that is not pending", function () {
        var promise = Q(10);
        expect(Q.isPending(promise)).toBe(false);
    });
});