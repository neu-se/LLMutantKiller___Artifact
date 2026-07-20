import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", function () {
    it("should return the inspected value of a fulfilled promise", function () {
        var promise = Q(10);
        return Q.nearer(promise).then(function (value) {
            expect(value).toBe(10);
        });
    });
});