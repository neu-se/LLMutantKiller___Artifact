import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", function () {
    it("should result in a fulfilled promise when given a value", function () {
        expect(Q(5).isFulfilled()).toBe(true);
    });

    it("should be the identity when given promise", function () {
        var f = Q(5);
        expect(Q(f)).toBe(f);
    });

    it.skip("should return the value when given a fulfilled promise", function () {
        var promise = Q(10);
        return Q.nearer(promise).then(function (value) {
            expect(value).toBe(10);
        });
    });
});