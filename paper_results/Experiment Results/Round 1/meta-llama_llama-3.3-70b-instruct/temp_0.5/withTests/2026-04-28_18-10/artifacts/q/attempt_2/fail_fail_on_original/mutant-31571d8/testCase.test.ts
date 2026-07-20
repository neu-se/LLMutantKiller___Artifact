import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should result in a fulfilled promise when given a value", () => {
        var promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });

    it("should be the identity when given promise", () => {
        var f = Q.fulfill(5);
        var r = Q.reject(new Error("aaargh"));
        var p = Q.promise(function () { });

        expect(Q(f)).toBe(f);
        expect(Q(r)).toBe(r);
        expect(Q(p)).toBe(p);
    });
});